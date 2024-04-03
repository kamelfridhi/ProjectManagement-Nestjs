import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class UserSettings{
    @Prop({ required: false,default:false })
    statusOnline: boolean;

    @Prop({ required: false , default: false })
    verifiedAccount: boolean;

    @Prop({ required: false , default: 0 })//0 en attente /1 accepted /-1 declined
    statusAccount: number;

    @Prop({ default: false })
    blocked: boolean;

    @Prop()
    emailPhoto: boolean;




    
}

export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);