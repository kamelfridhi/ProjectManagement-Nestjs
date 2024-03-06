import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from "../../../schemas/enums/task.status";

export class UpdateStatusDto {
    @IsNotEmpty()
    @IsEnum(TaskStatus)
    status: TaskStatus;
}
