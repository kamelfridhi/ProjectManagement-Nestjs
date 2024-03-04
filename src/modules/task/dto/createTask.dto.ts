    import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsDateString,
    IsNumber,
    IsEnum,
    IsArray,
        ValidateNested
    } from 'class-validator';
    import {TaskCategory} from "../../../schemas/enums/task.category";
    import {TaskPriority} from "../../../schemas/enums/task.prioirity";
    import {TaskStatus} from "../../../schemas/enums/task.status";
    import {StatusOfTask} from "../../../schemas/status.schema";
    import {Type} from "class-transformer";

export class StatusOfTaskDTO {
    @IsNotEmpty()
    @IsEnum(TaskStatus)
    statustask: TaskStatus;
}

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
        @IsString()
        projectId?: "8";

        @IsOptional()
        @IsEnum(TaskPriority)
        priority?: TaskPriority;

        @IsOptional()
        @IsString()
        description?: string;


        @ValidateNested()
        @Type(()=>StatusOfTaskDTO)
        status: StatusOfTaskDTO[];
    }
