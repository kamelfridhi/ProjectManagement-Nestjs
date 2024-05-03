import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserRoles } from "./enums/user.roles";
import { Task } from "./task.schema";
import mongoose from "mongoose";
import {StatusOfTask} from "./status.schema";

@Schema()
export class Sprint{


    @Prop()
    sprintName: string;

    @Prop()
    sprintDescription: string;

    @Prop()
    startDate: Date;

    @Prop()
    endDate: Date;

    @Prop()
    period: string;
    @Prop({ type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] })
    tasks: Task[];
    @Prop({ type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Status' }] })
    status: StatusOfTask[];

}

export const SprintSchema = SchemaFactory.createForClass(Sprint);