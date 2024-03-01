/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/global-utils/base.service';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/updateUserDto';
import { AuthDto } from './dto/Auth.dto';
import { UserSettings } from 'src/schemas/userSettings.schema';
import { Role } from 'src/schemas/roles.schema';
import { UserRoles } from 'src/schemas/enums/user.roles';

@Injectable()
export class UserService extends BaseService<User>{
    constructor(
        private jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(UserSettings.name) private userSettingsModel: Model<UserSettings>,
        @InjectModel(Role.name) private roleModel: Model<Role>,
    ) {
        super(userModel);
    }

    async createUser({ password, role, ...restOfAttributes }: CreateUserDto) {
        const settings = await new this.userSettingsModel().save();

        const roleDocument = await this.roleModel.findOne({ role }).exec();
        if (!roleDocument) {
            throw new NotFoundException('no role like that');;
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new this.userModel({ password: hashedPassword, settings, role:roleDocument, ...restOfAttributes });
        return newUser.save();
    }

    async login({ email, password }: AuthDto) {

        console.log(email, password);
        const findedUser = await this.userModel.findOne({ email }).lean().exec()

        if (!findedUser) { throw new NotFoundException('incorrect email'); }

        const passwordMatch = await bcrypt.compare(password, findedUser.password);
        if (!passwordMatch) {
            throw new NotFoundException('Incorrect password');
        }

        const { password: _, username,role,teams,settings,age, ...user } = findedUser;

        return this.jwtService.sign(user);

    }

    getAllUsers() {
        return super.findAll();
    }

    getOneUser(id: string) {
        return super.findOne(id, ['settings', 'role', 'teams']);;
    }

    updateUser(id: string, updateUserDto: UpdateUserDto) {
        return super.update(id, updateUserDto);
    }

    deleteUser(id: string) {
        return super.remove(id);
    }



}
