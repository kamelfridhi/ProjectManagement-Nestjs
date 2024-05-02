/*
https://docs.nestjs.com/controllers#controllers
*/

import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpException, Logger, NotFoundException,
    Param,
    Patch,
    Post, Query,
    Res,
    UploadedFile,
    UseInterceptors,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUserDto';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from 'multer';

import * as fs from "fs";
import { extname } from "path";
import { Response } from 'express';
import { ChangeRoleDto } from "./dto/changeRole.dto";


@Controller('user')
export class UserController {
    private readonly logger = new Logger(UserController.name);

    constructor(
        private readonly usersService: UserService,

    ) {

    }
    @Get('count')
    async getUserCount(): Promise<number> {
      return await this.usersService.getUserCount();
    }
  
    @Get('gender-distribution')
    async getGenderDistribution(): Promise<{ male: number; female: number }> {
      return await this.usersService.getGenderDistribution();
    }
  
    @Get('age-distribution')
    async getAgeDistribution(): Promise<{ [ageGroup: string]: number }> {
      return await this.usersService.getAgeDistribution();
    }

    @Post('upload/:userID')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const userId = req.params.userID; // Get the userID from the request parameters
                const fileExtension = extname(file.originalname);
                const filename = `${userId}-${Date.now()}${fileExtension}`; // Use userID in the filename
                cb(null, filename);
            },
        }),
        fileFilter: (req, file, cb) => {
            // Check if the file type is valid (e.g., jpg, jpeg, png)
            if (!file.originalname.match(/\.(jpg|jpeg|png|PNG|JPG|JPEG)$/)) {
                return cb(new BadRequestException('Only JPG, JPEG, and PNG files are allowed'), false);
            }
            cb(null, true);
        }/*,
            limits: {
                fileSize: 1024 * 1024, // 1MB file size limit
            },
            */
    }))
    async uploadFile(@UploadedFile() file, @Param('userID') userID: string) {
        // Handle file upload logic here
        if (!file) {
            throw new BadRequestException('No file uploaded');
        }

        // Update user image property in the database
        const user = await this.usersService.updateImgProp(userID, file.filename);
        return { user, filename: file.filename };
    }

    @Get('image/:userId')
    async getUserImage(@Param('userId') userId: string, @Res() res: Response) {
        try {
            this.logger.log(`Fetching image for user with ID: ${userId}`);
            const data = await this.usersService.getOneUser(userId);
            const user = data.data;

            if (!user || !user.photo) {
                this.logger.warn(`User image not found for user with ID: ${userId}`);
                return res.status(404).send('User image not found');
            }

            this.logger.log(`Sending image for user with ID: ${userId}`);

            if (user.settings && user.settings.emailPhoto) {
                return res.json({ userEmailPic: user.photo }); // Return the image URL
            } else {
                const contentType = 'image/jpeg'; // Change this based on the actual file type
                res.header('Content-Type', contentType);
                return res.sendFile(user.photo, { root: 'uploads' }); // Send the image file
            }
        } catch (error) {
            this.logger.error(`Error fetching user image: ${error.message}`);
            throw new NotFoundException('User image not found');
        }
    }

    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers();
    }
    @Get('getUsersEtat/:etat')
    getUsersWithEtat(@Param('etat') etat: number) {
        return this.usersService.getUsersWithEtat(etat);
    }
    
    @Get('getBlockedUsers')
    getBlockedUsers() {
        return this.usersService.getBlockedUsers();
    }

    @Get(':id')
    async getOneUser(@Param('id') id: string) {
        const user = await this.usersService.getOneUser(id);
        if (!user) throw new HttpException('User not found', 404);
        return user;
    }

    @Patch(':id')
    async updateUser(@Param('id') id: string, @Body() updatedUserDto: UpdateUserDto) {
        const updatedUser = await this.usersService.updateUser(id, updatedUserDto);
        if (!updatedUser) throw new HttpException('User not found', 404);
        return updatedUser;
    }
    @Patch('accept/:id')
    async acceptUser(@Param('id') id: string) {
        return await this.usersService.acceptUser(id);
    }
    @Patch('blockUser/:id')
    async blockUser(@Param('id') id: string) {
        return await this.usersService.blockUser(id);
    }
    @Patch('decline/:id')
    async declinetUser(@Param('id') id: string) {
        return await this.usersService.declinetUser(id);
    }
    @Patch('setRole/:id')
    async setRole(@Param('id') id: string, @Body() role: ChangeRoleDto) {
        return await this.usersService.setRole(id, role);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        const deletedUser = await this.usersService.deleteUser(id);
        if (!deletedUser) throw new HttpException('User not found', 404);
        return deletedUser;
    }


    @Patch('updateMe/:id')
    //@UseGuards(AuthGuard) // Assuming you have an AuthGuard to verify user authentication
    async updateMe(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string) {
        return await this.usersService.updateMe(updateUserDto, id);
    }

    @Patch('importPhotoFromEmail/:id')
    //@UseGuards(AuthGuard) // Assuming you have an AuthGuard to verify user authentication
    async importPhotoFromEmail(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string) {
        return await this.usersService.importPhotoFromEmail(updateUserDto, id);
    }
    @Post('forgotPassword')
    //@UseGuards(AuthGuard) // Assuming you have an AuthGuard to verify user authentication
    async forgotPassword(@Body() data: { email: string }) {
        return await this.usersService.forgotPassword(data.email);
    }
    @Post('resetPassword')
    async resetPassword(@Query('token') token: string, @Body('password') password: string, @Body('code') code: string) {
        return await this.usersService.resetPassword(token, password, code);
    }

}
