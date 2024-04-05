import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
 import { UserSchema } from "../../schemas/user.schema";
import {NotificationSchema} from "../../schemas/notification.schema";
import {NotificationService} from "./notification.service";


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Notification', schema: NotificationSchema },
            { name: 'User', schema: UserSchema },


        ]),
    ],

    providers: [NotificationService],
    exports: [NotificationService], // Export the NotificationService to be used in other modules
})
export class NotificationModule {}
