import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class UserSettings{
    @Prop({ required: false })
    statusOnline?: boolean;

    @Prop({ required: true })
    blocked: boolean;
    
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);