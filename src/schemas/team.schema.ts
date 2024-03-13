import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "./user.schema";
import { Project } from "./project.schema";
import { TaskCategory } from "./enums/task.category";
import { TeamCategoryEnum } from './enums/team.category.enum';

@Schema()
export class Team {
    
    @Prop({ required: false })
    name: string;

    @Prop({ required: false })
    description: string;

    @Prop({ type: String, enum: TeamCategoryEnum})
    category: TeamCategoryEnum;


    @Prop({ type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    users: User[];

    @Prop({ type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }] })
    project: Project[];


}

export const TeamSchema = SchemaFactory.createForClass(Team);