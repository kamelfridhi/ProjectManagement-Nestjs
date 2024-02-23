import { IsOptional, IsString, IsDateString, IsEnum } from 'class-validator';
import {TaskPriority} from "../../../schemas/enums/task.prioirity";
import {TaskCategory} from "../../../schemas/enums/task.category";


export class UpdateTaskDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEnum(TaskCategory)
    category?: TaskCategory;

    @IsOptional()
    @IsDateString()
    startDate?: string;

    @IsOptional()
    @IsDateString()
    endDate?: string;

    @IsOptional()
    @IsEnum(TaskPriority)
    priority?: TaskPriority;

    @IsOptional()
    @IsString()
    description?: string;
}
