// update-user.dto.ts

import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    firstName?: string;

    @IsOptional()
    @IsString()
    lastName?: string;

    @IsOptional()
    @IsString()
    email: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    telephone?: string;

    @IsOptional()
    @IsDateString()
    dateOfBirth?: Date;

    @IsString()
    password?: string;


    // Add other fields as needed
}
