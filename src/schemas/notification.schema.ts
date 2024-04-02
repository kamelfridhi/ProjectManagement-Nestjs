// notification.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import {User} from "./user.schema";
import {Team} from "./team.schema";


@Schema()
export class Notification {


    @Prop({ required: true })
    message: string;


    @Prop({ default: Date.now })
    timestamp: Date;

    @Prop({ default: false })
    read: boolean; // Flag to indicate if the notification has been read
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Team' })
    pending: Team; // Array to store pending team invitations for the notification

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User; // Reference to the user associated with the notification

    @Prop({ required: true })
    type: string; // Example: 'team-invitation', 'task-assignment', etc.
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
