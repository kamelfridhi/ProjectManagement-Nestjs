import { Module } from '@nestjs/common';
import { sprintController } from './sprint.controller';
import { sprintService } from './sprint.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from 'src/schemas/task.schema';
import {StatusOfTask, StatusOfTaskSchema} from "../../schemas/status.schema";
import {User, UserSchema} from "../../schemas/user.schema";
import { Sprint, SprintSchema } from 'src/schemas/sprint.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Sprint.name, schema: SprintSchema }

        ])
    ],
    controllers: [ sprintController ],
    providers: [sprintService],
})
export class sprintModule { }
