import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';
import { StatusOfTask, StatusOfTaskSchema } from '../../schemas/status.schema';
import {Project, projectSchema} from "../../schemas/project.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: StatusOfTask.name, schema: StatusOfTaskSchema },
            { name: Project.name, schema: projectSchema },
        ]),
    ],
    controllers: [StatusController],
    providers: [StatusService],
})
export class StatusModule {}
