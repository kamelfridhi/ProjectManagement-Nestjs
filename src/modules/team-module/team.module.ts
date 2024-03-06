import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamSchema } from 'src/schemas/team.schema';
import { UserSchema } from "../../schemas/user.schema";
import { projectSchema } from "../../schemas/project.schema";
import { TaskSchema } from "../../schemas/task.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Team.name, schema: TeamSchema },
            { name: 'User', schema: UserSchema },
            { name: 'Project', schema: projectSchema },
            { name: 'Task', schema: TaskSchema },
        ])
    ],
    controllers: [TeamController],
    providers: [TeamService],
})
export class TeamModule {}
