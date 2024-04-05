
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { projectController } from './project.controller';
import { Project, projectSchema } from 'src/schemas/project.schema';
import { projectService } from './project.service';
import { Team, TeamSchema } from "../../schemas/team.schema";
import { UserSchema } from "../../schemas/user.schema";
import { TaskSchema } from "../../schemas/task.schema";
import { TeamService } from '../team-module/team.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Team.name, schema: TeamSchema },
            { name: 'User', schema: UserSchema },
            { name: Project.name, schema: projectSchema },
            { name: 'Task', schema: TaskSchema },
        ])
    ],
    providers: [
        projectService,
        TeamService
    ],
    controllers: [projectController]
})
export class ProjectModule { }