import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { TaskCategory } from "../../../schemas/enums/task.category";
import { TeamCategory } from "../../../schemas/enums/team.category";

export class CreateTeamDto{
 @IsNotEmpty()
@IsString()
  name:string;


  @IsNotEmpty()
  @IsString()
  description: string;


  @IsNotEmpty()
  @IsEnum(TeamCategory)
  category: TeamCategory;
 
}