import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {TaskCategory} from "./enums/task.category";
import {TaskPriority} from "./enums/task.prioirity";
import mongoose from "mongoose";
import { Board } from "./board.schema";
import { StatusOfTask } from "./status.schema";
import { UserSettings } from "./userSettings.schema";
import { User } from "./user.schema";

@Schema()
export class Task{
    
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    category: TaskCategory;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    priority: TaskPriority;

    @Prop({ default: Date.now })
    creationDate: Date;

    @Prop()
    startDate: Date;

    @Prop()
    endDate: Date;

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Board'})
    board: Board;

    @Prop({ type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'StatusOfTask' }] })
    status: StatusOfTask[];

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User'})
    assignedTo: mongoose.Types.ObjectId; // Store only the ObjectId of the user
}

export const TaskSchema = SchemaFactory.createForClass(Task);