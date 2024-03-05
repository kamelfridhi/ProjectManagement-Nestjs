import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { UserSettings } from "./userSettings.schema";
import { Role } from "./roles.schema";
import { Team } from "./team.schema";

@Schema()
export class User {
    @Prop()
    username: string;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    dateOfBirth: Date;

    @Prop()
    address: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserSettings' })
    settings: UserSettings;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
    role: Role;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }] })
    teams: Team[];


}

export const UserSchema = SchemaFactory.createForClass(User);