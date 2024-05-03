import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { TicketService } from "./ticket.service";
import { Ticket } from "../../schemas/ticket.schema";

@Controller('tickets')
export class TicketController {
    constructor(private readonly ticketService: TicketService) {}

    @Get()
    async getAllTickets(): Promise<Ticket[]> {
        return this.ticketService.getAllTickets();
    }

    @Post(':userId')
    async addTicket(@Body() ticketData: Partial<Ticket>,@Param('userId') userId: string): Promise<Ticket> {
        return this.ticketService.addTicket(ticketData,userId);
    }

    @Put(':id')
    async updateTicket(@Param('id') ticketId: string, @Body() ticketData: Partial<Ticket>): Promise<Ticket> {
        return this.ticketService.updateTicket(ticketId, ticketData);
    }

    @Delete(':id')
    async deleteTicket(@Param('id') ticketId: string): Promise<Ticket> {
        return this.ticketService.deleteTicket(ticketId);
    }
}
