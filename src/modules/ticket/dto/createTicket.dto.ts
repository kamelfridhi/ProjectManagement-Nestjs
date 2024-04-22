import {IsDateString, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreateTicketDto {

    @IsNotEmpty()
    @IsString()
    subject: string;

    @IsOptional()
    @IsDateString()
    creationDate?: Date;
}
