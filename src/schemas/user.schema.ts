import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User{
    @Prop({ required: false })
    username: string;

    @Prop({ required: true,unique: true })
    email: string;

    
    @Prop({ required: true })
    password: string;

    @Prop({ required: false })
    age: number;

    @Prop({required:false})
    avatarUrl?: string;

    @Prop({required:false})
    displayName?: string;

}

export const UserSchema = SchemaFactory.createForClass(User);