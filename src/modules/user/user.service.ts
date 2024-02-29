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

@Injectable()
export class UserService extends BaseService<User>{ 
    constructor(
        private jwtService:JwtService,
        @InjectModel(User.name) private userModel: Model<User>,
    ) {
        super(userModel);
    }

    async createUser({ password,...restOfAttributes }: CreateUserDto)   {
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new this.userModel({ password:hashedPassword, ...restOfAttributes});
        return newUser.save();
    }

    async login({ email, password }: AuthDto) {

        console.log(email, password);
        const findedUser = await this.userModel.findOne({email}).lean().exec()

        if (!findedUser) { throw new NotFoundException('incorrect email'); }

        const passwordMatch = await bcrypt.compare(password, findedUser.password); 
        if (!passwordMatch) {
            throw new NotFoundException('Incorrect password');
        }

        const { password:_,avatarUrl,displayName,username, ...user } = findedUser;

        return this.jwtService.sign(user);

    }

    getAllUsers() {
       return super.findAll();
    }

    getOneUser(id: string) {
        return super.findOne(id);
    }

    updateUser(id: string, updateUserDto: UpdateUserDto) {
        return super.update(id,updateUserDto);
    }

    deleteUser(id: string) {
        return super.remove(id);
    }



}
