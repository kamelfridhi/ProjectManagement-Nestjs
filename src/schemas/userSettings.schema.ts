import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class UserSettings{
    @Prop({ required: false })
    statusOnline?: boolean;

    @Prop({ default: false })
    blocked: boolean;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;

    
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);