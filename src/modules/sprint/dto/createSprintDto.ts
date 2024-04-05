import { IsNotEmpty, IsString } from "class-validator";
export class createSprintDto{
    @IsNotEmpty()
    projectName:string;
    @IsNotEmpty()
    startDate: Date;
    @IsNotEmpty()
    endDate: Date;

    projectDescription: string;
    
    period:string;
    
}