import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class UserSettings{
    @Prop({ required: false,default:false })
    statusOnline: boolean;

    @Prop({ required: false , default: false })
    verifiedAccount: boolean;

    @Prop({ default: false })
    blocked: boolean;

    @Prop()
    emailPhoto: boolean;




    
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);