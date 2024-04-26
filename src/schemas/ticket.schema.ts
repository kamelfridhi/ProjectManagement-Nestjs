import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "./user.schema"; // Assurez-vous que User est correctement importé depuis votre fichier user.schema.ts

@Schema()
export class Ticket {
    @Prop({ required: true })
    subject: string;

    @Prop({ default: Date.now })
    creationDate: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' }) // Décommentez cette ligne pour référencer l'utilisateur assigné
    assignPerson: User;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
