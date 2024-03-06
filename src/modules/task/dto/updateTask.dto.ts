import { IsOptional, IsString, IsDateString, IsEnum } from 'class-validator';
import {TaskPriority} from "../../../schemas/enums/task.prioirity";
import {TaskCategory} from "../../../schemas/enums/task.category";
import {Type} from "class-transformer";
import {StatusOfTaskDTO} from "./createTask.dto";


export class UpdateTaskDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEnum(TaskCategory)
    category?: TaskCategory;

    @IsOptional()
    @IsDateString()
    startDate?: Date;

    @IsOptional()
    @IsDateString()
    endDate?: Date;

    @IsOptional()
    @IsEnum(TaskPriority)
    priority?: TaskPriority;

    @IsOptional()
    @IsString()
    description?: string;


}
