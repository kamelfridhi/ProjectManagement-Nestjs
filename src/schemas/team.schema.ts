import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "./user.schema";
import { Project } from "./project.schema";

@Schema()
export class Team{
    
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    users: User[];

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Project'})
    project: Project;


}

export const TeamSchema = SchemaFactory.createForClass(Team);