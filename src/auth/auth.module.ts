/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from 'src/schemas/user.schema';
import { AuthController } from './auth.controller';
import { UserService } from 'src/modules/user/user.service';
import { UserSettings, UserSettingsSchema } from 'src/schemas/userSettings.schema';
import { Role, UserRoleSchema } from 'src/schemas/roles.schema';
import { UserModule } from 'src/modules/user/user.module';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: '11@MY@24',
            signOptions: { expiresIn: '1d' },
        }),
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: UserSettings.name, schema: UserSettingsSchema },
            { name: Role.name, schema: UserRoleSchema },
        ])
    ],
    controllers: [AuthController],
    providers: [],
})
export class AuthModule { }
