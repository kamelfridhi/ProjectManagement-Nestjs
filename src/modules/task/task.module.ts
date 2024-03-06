import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from 'src/schemas/task.schema';
import {StatusOfTask, StatusOfTaskSchema} from "../../schemas/status.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Task.name, schema: TaskSchema },{ name: StatusOfTask.name, schema: StatusOfTaskSchema },

        ])
    ],
    controllers: [TaskController],
    providers: [TaskService],
})
export class TaskModule { }
