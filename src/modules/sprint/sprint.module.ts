import { Module } from '@nestjs/common';
import { sprintController } from './sprint.controller';
import { sprintService } from './sprint.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from 'src/schemas/task.schema';
import {StatusOfTask, StatusOfTaskSchema} from "../../schemas/status.schema";
import {User, UserSchema} from "../../schemas/user.schema";
import { Sprint, SprintSchema } from 'src/schemas/sprint.schema';
import {Project, projectSchema} from "../../schemas/project.schema";
import {StatusService} from "../status/status.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: StatusOfTask.name, schema: StatusOfTaskSchema },
            { name: Sprint.name, schema: SprintSchema },
            { name: Project.name, schema: projectSchema },
        ])
    ],
    controllers: [ sprintController ],
    providers: [sprintService,StatusService],
})
export class sprintModule { }
