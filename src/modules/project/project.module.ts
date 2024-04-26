
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { projectController } from './project.controller';
import { Project, projectSchema } from 'src/schemas/project.schema';
import { projectService } from './project.service';
import { UserSchema } from "../../schemas/user.schema";
import { TaskSchema } from "../../schemas/task.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'User', schema: UserSchema },
            { name: Project.name, schema: projectSchema },
            { name: 'Task', schema: TaskSchema },
        ])
    ],
    providers: [
        projectService],
    controllers: [projectController]
})
export class ProjectModule { }