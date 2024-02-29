import { IsNotEmpty, IsString } from "class-validator";

export class CreateTeamDto{

    @IsNotEmpty()
    @IsString()
    name:string;
    @IsNotEmpty()
    @IsString()
    description: string;

}