import { IsNotEmpty, IsOptional, IsString, IsDateString, IsNumber, IsEnum } from 'class-validator';
import {TaskCategory} from "../../../schemas/enums/task.category";
import {TaskPriority} from "../../../schemas/enums/task.prioirity";
import {TaskStatus} from "../../../schemas/enums/task.status";



export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsEnum(TaskCategory)
    category: TaskCategory;

    @IsDateString()
    startDate: Date;

    @IsOptional()
    @IsDateString()
    endDate?: Date;

    @IsOptional()
    @IsDateString()
    creationDate?: Date;

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
