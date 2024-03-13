import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UserSettings, UserSettingsSchema } from 'src/schemas/userSettings.schema';
import { Role, UserRoleSchema } from 'src/schemas/roles.schema';
import {Notification, NotificationSchema} from "../../schemas/notification.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: UserSettings.name, schema: UserSettingsSchema },
            { name: Role.name, schema: UserRoleSchema },
            { name: 'notifications', schema: NotificationSchema },

        ])
    ],
    controllers: [UserController],
    providers: [UserService],
    exports:[UserService]
})
export class UserModule { }
