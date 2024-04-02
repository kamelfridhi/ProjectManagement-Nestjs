import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamSchema} from 'src/schemas/team.schema';
import { UserSchema } from "../../schemas/user.schema";
import { projectSchema } from "../../schemas/project.schema";
import { TaskSchema } from "../../schemas/task.schema";
import {NotificationSchema} from "../../schemas/notification.schema";
import {NotificationModule} from "../notification/notification.module";
import {ChatMessage, ChatMessageSchema} from "../../schemas/ChatMessage.schema";
import {TeamWebSocketGateway} from "./team.websocket.gateway";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Team.name, schema: TeamSchema },
            { name: ChatMessage.name, schema: ChatMessageSchema },
             { name: 'User', schema: UserSchema },
            { name: 'Project', schema: projectSchema },
            { name: 'Task', schema: TaskSchema },
            { name: 'Notification', schema: NotificationSchema },
         ]),
        NotificationModule, // Import and include NotificationModule here
     ],
    controllers: [TeamController],
    providers: [
        TeamService,
        TeamWebSocketGateway, // Include TeamWebSocketGateway in providers
    ],
})
export class TeamModule {}
