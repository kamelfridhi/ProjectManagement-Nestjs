import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { UserSettings } from "./userSettings.schema";
import { Role } from "./roles.schema";
import { Team } from "./team.schema";
import { Task } from "./task.schema";

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

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'UserSettings'})
    settings: UserSettings;

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Role'})
    role: Role;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Team' })
    teams: Team;


}

export const UserSchema = SchemaFactory.createForClass(User);