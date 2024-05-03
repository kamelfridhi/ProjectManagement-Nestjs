import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UserSettings, UserSettingsSchema } from 'src/schemas/userSettings.schema';
import { Role, UserRoleSchema } from 'src/schemas/roles.schema';

import {Notification, NotificationSchema} from "../../schemas/notification.schema";

import { EmailService } from "./mail.service";
import {Project, projectSchema} from "../../schemas/project.schema";


import { WebsocketGateway } from "./socket.io"; // Import WebSocketGateway

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
    providers: [UserService,EmailService,WebsocketGateway],
    exports:[UserService,EmailService]
})
export class UserModule { }