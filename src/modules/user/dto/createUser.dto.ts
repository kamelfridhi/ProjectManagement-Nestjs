import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class SettingsDto {
    @IsOptional()
    @IsBoolean()
    blocked?: string;

    @IsOptional()
    @IsBoolean()
    recieveEmail?: string;

    @IsOptional()
    @IsBoolean()
    recieveNotif?: string;

    @IsOptional()
    @IsBoolean()
    recieveSMS?: string;

}

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
    
    @IsOptional()
    @ValidateNested()
    @Type(() => SettingsDto)
    settings?: SettingsDto;

    @IsNotEmpty()
    @IsString() 
    role: string;
}