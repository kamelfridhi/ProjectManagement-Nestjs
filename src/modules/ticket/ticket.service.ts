import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Ticket } from "../../schemas/ticket.schema";
import {User} from "../../schemas/user.schema";

@Injectable()
export class TicketService {
    constructor(@InjectModel(Ticket.name) private ticketModel: Model<Ticket>,@InjectModel(User.name) private userModel: Model<User>) {}

    async addTicket(ticketData: Partial<Ticket> , userId: string): Promise<Ticket> {
        const user = await this.userModel.findById(userId);

        const newTicket = new this.ticketModel({...ticketData,assignPerson : user});
        return await newTicket.save();
    }

    async getAllTickets(): Promise<Ticket[]> {
        return await this.ticketModel.find().populate('assignPerson');
    }

    async updateTicket(ticketId: string, ticketData: Partial<Ticket>): Promise<Ticket> {
        return await this.ticketModel.findByIdAndUpdate(ticketId, ticketData, { new: true }).exec();
    }

    async deleteTicket(ticketId: string): Promise<Ticket> {
        return await this.ticketModel.findByIdAndDelete(ticketId).exec();
    }
}
