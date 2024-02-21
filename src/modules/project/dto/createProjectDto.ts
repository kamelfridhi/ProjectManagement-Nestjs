
import { IsNotEmpty, IsString } from "class-validator";

export class createProjectDto{
    @IsNotEmpty()
    projectName:string;

    projectId: number;
    
    projectDescription: string;
}