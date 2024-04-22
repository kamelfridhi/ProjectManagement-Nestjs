import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Ticket } from "../../schemas/ticket.schema";

@Injectable()
export class TicketService {
    constructor(@InjectModel(Ticket.name) private ticketModel: Model<Ticket>) {}

    async addTicket(ticketData: Partial<Ticket>): Promise<Ticket> {
        const newTicket = new this.ticketModel(ticketData);
        return await newTicket.save();
    }

    async getAllTickets(): Promise<Ticket[]> {
        return await this.ticketModel.find().exec();
    }

    async updateTicket(ticketId: string, ticketData: Partial<Ticket>): Promise<Ticket> {
        return await this.ticketModel.findByIdAndUpdate(ticketId, ticketData, { new: true }).exec();
    }

    async deleteTicket(ticketId: string): Promise<Ticket> {
        return await this.ticketModel.findByIdAndDelete(ticketId).exec();
    }
}
