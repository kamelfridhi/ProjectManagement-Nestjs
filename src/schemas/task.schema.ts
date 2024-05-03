import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {TaskCategory} from "./enums/task.category";
import {TaskPriority} from "./enums/task.prioirity";
import mongoose, {Types} from "mongoose";
import { Board } from "./board.schema";
import { StatusOfTask } from "./status.schema";
 import { UserSettings } from "./userSettings.schema";
import { User } from "./user.schema";
 

@Schema()
export class Task{
    
    @Prop({ required: true })
    name: string;

    @Prop({ required: false })
    category: TaskCategory;

    @Prop({ required: false })
    description: string;

    @Prop({ required: false })
    priority: TaskPriority;

    @Prop({ required: false })
    taskcomplexity:number;

    @Prop({ default: Date.now })
    creationDate: Date;

    @Prop()
    startDate: Date;

    @Prop()
    endDate: Date;

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Board'})
    board: Board;

    // bech twali string id ekhir status
    @Prop({ type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'StatusOfTask' }] })
    status: StatusOfTask[];


    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    assignPerson: User;

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Sprint',required:false})
    sprint: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);