import { IsOptional, IsString } from "class-validator";

export class updateProjectDto{
    @IsOptional()
    @IsString()
    projectName?: string;
    @IsOptional()
    @IsString()
    Description?: string;
}