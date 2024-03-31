/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/global-utils/base.service';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/updateUserDto';
import { UserSettings } from 'src/schemas/userSettings.schema';
import { Role } from 'src/schemas/roles.schema';
import { EmailService } from "./mail.service";

@Injectable()
export class UserService extends BaseService<User>{
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(UserSettings.name) private userSettingsModel: Model<UserSettings>,
        @InjectModel(Role.name) private roleModel: Model<Role>,
        private readonly emailService: EmailService,

    ) {
        super(userModel);
    }

  async  updateImgProp(id: string,filename:string) {
    const user = await super.findOneForImgUpload(id, ['settings', 'role', 'teams']);
    const userSettings = user.settings;

    user.photo = filename;
    userSettings.emailPhoto=false;
    await userSettings.save();
    return await user.save();
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

  async updateMe(updateUserDto: UpdateUserDto, userId: string) {
    try {
      const { password, ...data } = updateUserDto;

      // Fetch the user from the database
      const user = await this.userModel.findById(userId);

      // Verify if the provided password matches the user's password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new NotFoundException('Incorrect password');
      }

      // Update user document
      const updatedUser = await this.userModel.findOneAndUpdate({ _id: userId }, data, { new: true, runValidators: true });

      // Return success response with updated user data
      return {
        status: 'success',
        data: {
          user: updatedUser,
        },
      };
    } catch (error) {
      // If NotFoundException is caught, return the error response with status 404
      if (error instanceof NotFoundException) {
        throw new HttpException({
          status: 'error',
          message: error.message,
        }, HttpStatus.NOT_FOUND);
      }

      // For other errors, return the generic error response
      throw new HttpException({
        status: 'error',
        message: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async forgotPassword(email: string): Promise<void> {

    const user = await this.userModel.findOne({email});
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const randomCode = this.generateRandomCode();
    const hashedCode = await this.hashRandomCode(randomCode);

    const token = this.generateResetToken(user);
    user.passwordResetToken = token;
    user.passwordResetCode = hashedCode
    user.passwordResetExpires = new Date(Date.now() + 600000); // 1 min
    await user.save();
    //console.log(user.firstName)
    const resetLink = `http://localhost:5173/newPassword?token=${token}`;

    await this.emailService.sendPasswordReset(user,resetLink,randomCode)
  }

  private generateResetToken(user): string {
    return `${Date.now()}${user._id}`;
  }

  async resetPassword(token: string, newPassword: string,code:string): Promise<void> {
    const user = await this.userModel.findOne({passwordResetToken:token});
    if (!user || new Date() > user.passwordResetExpires || !(await this.compareCodes(code,user.passwordResetCode)) ) {
      throw new NotFoundException('Invalid or expired token');
    }

    console.log(user.firstName)

    const newHashedPassword = await bcrypt.hash(newPassword, 12);

    user.password = newHashedPassword;
    user.passwordChangedAt = new Date(); // Update passwordChangedAt field
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetCode = undefined;
    await user.save();
  }

  // Function to generate a random code
   generateRandomCode = (): string => {
    return Math.random().toString(36).substring(2, 8); // Example: Generates a 6-character random code
  };

  // Function to hash a code
   hashRandomCode = async (code: string): Promise<string> => {
    const saltRounds = 10;
    const hashedCode = await bcrypt.hash(code, saltRounds);
    return hashedCode;
  };
  // Function to compare hashed code with user input
   compareCodes = async (userInputCode: string, hashedCode: string): Promise<boolean> => {
    try {
      // Compare the user input (hashed) with the hashed code from the database
      return await bcrypt.compare(userInputCode, hashedCode);

    } catch (error) {
      // Handle error
      console.error('Error comparing codes:', error);
      return false; // Return false in case of error
    }
  };

}
