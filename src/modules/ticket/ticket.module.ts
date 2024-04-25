import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TicketController } from "./ticket.controller";
import { TicketService } from "./ticket.service";
import { Ticket, TicketSchema } from "../../schemas/ticket.schema";
import {StatusOfTask, StatusOfTaskSchema} from "../../schemas/status.schema";
import {User, UserSchema} from "../../schemas/user.schema"; // Assurez-vous d'importer correctement le modèle et le schéma

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Ticket.name, schema: TicketSchema },
            { name: StatusOfTask.name, schema: StatusOfTaskSchema },
            { name: User.name, schema: UserSchema },
        ])
    ],
    controllers: [TicketController],
    providers: [TicketService],
})
export class TicketModule { }
