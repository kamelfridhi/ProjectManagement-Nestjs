/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUserDto';

@Controller('user')
export class UserController {
    constructor(
        private readonly usersService: UserService,

    ) {

    }


    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers();
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

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        const deletedUser = await this.usersService.deleteUser(id);
        if (!deletedUser) throw new HttpException('User not found', 404);
        return deletedUser;
    }





}
