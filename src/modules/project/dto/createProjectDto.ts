
import { IsNotEmpty, IsString } from "class-validator";
import { Board } from "src/schemas/board.schema";
import { Sprint } from "src/schemas/sprint.schema";
import { Task } from "src/schemas/task.schema";
import { Team } from "src/schemas/team.schema";

export class createProjectDto{
    @IsNotEmpty()
    projectName:string;
    @IsNotEmpty()
    startDate: Date;
    @IsNotEmpty()
    endDate: Date;

    projectDescription: string;
    
    team : Team;
    task:Task;
    sprints:Sprint;
    board:Board
}