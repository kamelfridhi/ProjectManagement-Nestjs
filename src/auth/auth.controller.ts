import { Body, Controller, Get, NotFoundException, Param, Post, Req, Res, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { AuthDto } from './dto/Auth.dto';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/modules/user/user.service';
import { CreateUserDto } from 'src/modules/user/dto/createUser.dto';
import { UserSettings } from 'src/schemas/userSettings.schema';
import { Role } from 'src/schemas/roles.schema';
import { OAuthDto } from "./dto/OAuth.dto";
import { UserRoles } from "../schemas/enums/user.roles";
import { EmailService } from "src/modules/user/mail.service";

@Controller('auth')
export class AuthController {
    constructor(
        private jwtService: JwtService,
        private readonly userService: UserService,
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(UserSettings.name) private userSettingsModel: Model<UserSettings>,
        @InjectModel(Role.name) private roleModel: Model<Role>,
        private readonly emailService: EmailService,

    ) { }



    @Post()
    //@UsePipes(new ValidationPipe())
    async createUser(@Body() createdUserDto: CreateUserDto) {
        const { password, role, ...restOfAttributes } = createdUserDto;
        const settings =  new this.userSettingsModel({emailPhoto:false});
        await settings.save();

        const roleDocument = await this.roleModel.findOne({ role }).exec();
        if (!roleDocument) {
            throw new NotFoundException('no role like that');
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new this.userModel({ password: hashedPassword, settings, role: roleDocument, ...restOfAttributes });
        return await newUser.save();
    }


    @Post('login')
    async login(@Body() loginAuthDto: AuthDto, @Res({ passthrough: true }) res: Response) {
        const { email, password } = loginAuthDto;

        const findedUser = await this.userModel.findOne({ email }).populate('role settings').lean().exec();

        if (!findedUser) {
            throw new NotFoundException('Incorrect email');
        }

        const passwordMatch = await bcrypt.compare(password, findedUser.password);
        if (!passwordMatch) {
            throw new NotFoundException('Incorrect password');
        }

        const jwt = await this.jwtService.signAsync({ id: findedUser._id });
        const { password: _, ...result } = findedUser;
        // Set the JWT token as an HTTP-only cookie

        res.cookie('jwt', jwt, { httpOnly: true });
        const userSettings = await this.userSettingsModel.findOne({ _id: findedUser.settings }).exec()
        userSettings.statusOnline = true;
        await userSettings.save();

        return {
            message: 'success',
            data: result,
            status: 200
        };
    }
    @Post('OAuth')
    async OAouth(@Body() oAuth: OAuthDto, @Res({ passthrough: true }) res: Response) {
        //const { email, password } = loginAuthDto;

        const findedUser = await this.userModel.findOne({ email:oAuth.email }).populate('role settings').lean().exec();

        if (!findedUser) {
            const settings =  new this.userSettingsModel({emailPhoto:true,statusOnline:true});
            await settings.save();
            const roleDocument = await this.roleModel.findOne({ role:UserRoles.user }).exec();
            if (!roleDocument) {
                throw new NotFoundException('no role like that');
            }
            const password = Math.random().toString(36).slice(-8);
            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = new this.userModel({ password: hashedPassword, settings, role: roleDocument,email:oAuth.email,photo:oAuth.photo, firstName:oAuth.username});
            await newUser.save();
            const jwt = await this.jwtService.signAsync({ id: newUser._id });
            const expire = new Date(Date.now()+3600000);
            res.cookie('jwt', jwt, { httpOnly: true });
            const userSettings = await this.userSettingsModel.findOne({ _id: newUser.settings }).exec()
            userSettings.statusOnline = true;
            await userSettings.save();
            await this.emailService.sendPassword(newUser,password)

          return {
            message: 'success',
            data: newUser,
            status: 200
          };
        }else {
            const jwt = await this.jwtService.signAsync({ id: findedUser._id });
            const { password: _, ...result } = findedUser;
            // Set the JWT token as an HTTP-only cookie
            res.cookie('jwt', jwt, { httpOnly: true });
            const userSettings = await this.userSettingsModel.findOne({ _id: findedUser.settings }).exec()
            userSettings.statusOnline = true;
            await userSettings.save();

            return {
                message: 'success',
                data: result,
                status: 200
            };
        }

    }
/*
    @Get('user')
    async loggedInUser(@Req() req: Request) {
        try {
            const data = await this.jwtService.verifyAsync(req.cookies['jwt']);
            if (!data) {
                throw new UnauthorizedException();
            }
            const user = await this.userService.getOneUser(data['id']);

            const { password, ...result } = user;
            return result;
        } catch (e) {
            throw new UnauthorizedException();
        }
    }
*/
    @Post('logout/:userID')
    async logout(@Res({ passthrough: true }) res: Response,@Param('userID') userId:string) {
        const findedUser = await this.userModel.findOne({ _id: userId }).populate("role settings").lean().exec();
        // Clear the JWT cookie to log out the user
        res.clearCookie('jwt');
        const userSettings = await this.userSettingsModel.findOne({ _id: findedUser.settings }).exec()
        userSettings.statusOnline = false;
        await userSettings.save();

        return { message: 'success' };
    }
}
