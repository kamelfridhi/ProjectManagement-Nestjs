// notification.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from '../../schemas/notification.schema';
import { User } from '../../schemas/user.schema';
import {Team} from "../../schemas/team.schema";
@Injectable()
export class NotificationService {
    constructor(
        @InjectModel(Notification.name) private readonly notificationModel: Model<Notification>,
        @InjectModel(User.name) private readonly userModel: Model<User>, // Inject the UserModel

    ) {}

    async sendTeamInvitationNotification(team: Team, userId: string): Promise<void> {
        const notificationMessage = `You have been invited to join the team "${team.name}". Do you accept?`;
        const notification = new this.notificationModel({
            message: notificationMessage,
            pending: team ,// Save the team ID in the pending field
            user:userId
        });
        await notification.save();

        // Find the user and add the notification
        const user = await this.userModel.findById(userId);
        if (user) {
            user.notifications.push(notification.toObject());
            await user.save();
        }
    }

}