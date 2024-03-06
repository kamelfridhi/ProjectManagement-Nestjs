import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserRoles } from "./enums/user.roles";
import { TaskStatus } from "./enums/task.status";

@Schema()
export class StatusOfTask{

    @Prop({ required: false })
    status: TaskStatus;

}

export const StatusOfTaskSchema = SchemaFactory.createForClass(StatusOfTask);