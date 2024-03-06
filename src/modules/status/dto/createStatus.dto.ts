import { IsEnum, IsNotEmpty } from 'class-validator';
import {TaskStatus} from "../../../schemas/enums/task.status";

export class CreateStatusDto {
    @IsNotEmpty()
    @IsEnum(TaskStatus)
    status: TaskStatus;



    // Vous pouvez ajouter d'autres propriétés si nécessaire
}
