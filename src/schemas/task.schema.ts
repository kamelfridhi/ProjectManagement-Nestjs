import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {TaskCategory} from "./enums/task.category";
import {TaskPriority} from "./enums/task.prioirity";

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

}

export const TaskSchema = SchemaFactory.createForClass(Task);