import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {TaskCategory} from "./enums/task.category";
import {TaskPriority} from "./enums/task.prioirity";
import mongoose from "mongoose";
import { Board } from "./board.schema";
import { StatusOfTask } from "./status.schema";

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

}

export const TaskSchema = SchemaFactory.createForClass(Task);