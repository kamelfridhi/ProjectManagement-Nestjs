// src/modules/team-module/dto/assignTask.dto.ts

import { IsNotEmpty, IsString } from 'class-validator';

export class AssignTaskDto {


  @IsNotEmpty()
  @IsString()
  taskId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
