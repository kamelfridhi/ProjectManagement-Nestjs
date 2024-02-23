import { IsNotEmpty, IsOptional, IsString, IsDateString, IsNumber, IsEnum } from 'class-validator';
import {TaskCategory} from "../../../schemas/enums/task.category";
import {TaskPriority} from "../../../schemas/enums/task.prioirity";



export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEnum(TaskCategory)
    category: TaskCategory;

    @IsOptional()
    @IsDateString()
    startDate?: string;

    @IsOptional()
    @IsDateString()
    endDate?: string;

    /*@IsOptional()
    @IsString()
    assignPerson?: string;*/

    @IsOptional()
    @IsEnum(TaskPriority)
    priority?: TaskPriority;

    @IsOptional()
    @IsString()
    description?: string;
}
