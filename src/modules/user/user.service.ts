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
import { UpdateUserDto } from './dto/updateUserDto';
import { UserSettings } from 'src/schemas/userSettings.schema';
import { Role } from 'src/schemas/roles.schema';

@Injectable()
export class UserService extends BaseService<User>{
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(UserSettings.name) private userSettingsModel: Model<UserSettings>,
        @InjectModel(Role.name) private roleModel: Model<Role>,
    ) {
        super(userModel);
    }

  async  updateImgProp(id: string,filename:string) {
    return await  this.userModel.findOneAndUpdate({_id:id}, {photo: filename}, {new: true});
  }
    getAllUsers() {
       return super.findAll();
    }

  async  getOneUser(id: string) {
        const user = await super.findOne(id, ['settings', 'role', 'teams']);
        const {password,...result} = user;
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return {
            message: 'success',
            data: result,
            status: 200
        };


    }


    updateUser(id: string, updateUserDto: UpdateUserDto) {
        return super.update(id, updateUserDto);
    }

    deleteUser(id: string) {
        return super.remove(id);
    }



}
