import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserRoles } from "./enums/user.roles";
import { TaskStatus } from "./enums/task.status";
import mongoose from "mongoose";
import {Project} from "./project.schema";
import {Sprint} from "./sprint.schema";

@Schema()
export class StatusOfTask{

    @Prop({ required: false })
    status: TaskStatus;

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Sprint',required:false})
    sprint: string;



}



export const StatusOfTaskSchema = SchemaFactory.createForClass(StatusOfTask);