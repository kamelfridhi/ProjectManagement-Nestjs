import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { TaskCategory } from "../../../schemas/enums/task.category";
import { TeamCategoryEnum } from "../../../schemas/enums/team.category.enum";

export class CreateTeamDto{
 @IsNotEmpty()
@IsString()
  name:string;


  @IsNotEmpty()
  @IsString()
  description: string;


  @IsNotEmpty()
  @IsEnum(TeamCategoryEnum)
  category: TeamCategoryEnum;
 
}