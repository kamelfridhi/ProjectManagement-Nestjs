import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose from "mongoose";
import {User} from "./user.schema";

@Schema()
export class ChatMessage {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    sender:User; // Reference to the user who sent the message

    @Prop()
    content: string;

    @Prop({ required: false, default: Date.now })
    timestamp: Date;
}
export const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage);