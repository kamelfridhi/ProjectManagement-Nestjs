import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    UseInterceptors,
    BadRequestException, Logger,
    UploadedFile, Res, NotFoundException, HttpException
} from "@nestjs/common";
import { TicketService } from "./ticket.service";
import { Ticket } from "../../schemas/ticket.schema";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {extname} from "path";
import {Response} from "express";

@Controller('tickets')
export class TicketController {
    constructor(private readonly ticketService: TicketService) {}

    @Get(':idTicket')
    async getOneTicket(@Param('idTicket') idTicket: string) {
        const user = await this.ticketService.getTicketById(idTicket);
        if (!user) throw new HttpException('User not found', 404);
        return user;
    }

    @Get('image/:ticketId')
    async getUserImage(@Param('ticketId') ticketId: string, @Res() res: Response) {
        try {
            //this.logger.log(`Fetching image for user with ID: ${userId}`);
            const ticket = await this.ticketService.getTicketById(ticketId);


            if (!ticket || !ticket.photo) {
                //this.logger.warn(`User image not found for user with ID: ${userId}`);
                return res.status(404).send('User image not found');
            }

            //this.logger.log(`Sending image for user with ID: ${userId}`);


                const contentType = 'image/jpeg'; // Change this based on the actual file type
                res.header('Content-Type', contentType);
                return res.sendFile(ticket.photo, { root: 'uploads/tickets' }); // Send the image file

        } catch (error) {
            //this.logger.error(`Error fetching user image: ${error.message}`);
            throw new NotFoundException('User image not found');
        }
    }

    @Post('upload/:ticketId')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads/tickets',
            filename: (req, file, cb) => {
                const ticketId = req.params.ticketId; // Get the userID from the request parameters
                const fileExtension = extname(file.originalname);
                const filename = `${ticketId}-${Date.now()}${fileExtension}`; // Use userID in the filename
                cb(null, filename);
            },
        }),
        fileFilter: (req, file, cb) => {
            // Check if the file type is valid (e.g., jpg, jpeg, png)
            if (!file.originalname.match(/\.(jpg|jpeg|png|PNG|JPG|JPEG)$/)) {
                return cb(new BadRequestException('Only JPG, JPEG, and PNG files are allowed'), false);
            }
            cb(null, true);
        }/*,
            limits: {
                fileSize: 1024 * 1024, // 1MB file size limit
            },
            */
    }))
    async uploadFile(@UploadedFile() file, @Param('ticketId') ticketId: string) {
        // Handle file upload logic here
        if (!file) {
            throw new BadRequestException('No file uploaded');
        }

        // Update user image property in the database
        const ticket = await this.ticketService.updateImgProp(ticketId, file.filename);
        return { ticket, filename: file.filename };
    }


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
