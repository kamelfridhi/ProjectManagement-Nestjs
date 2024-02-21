
import { Prop, Schema,SchemaFactory } from "@nestjs/mongoose";
import { Team } from "./team.schema";
import { Task } from "./task.schema";
@Schema()
export class project{
    
    @Prop()
    projectName: string;
    @Prop()
    projectId: number;
    @Prop()
    projectDescription: string;
    @Prop()
    startDate: Date;
    @Prop()
    endDate: Date;
    @Prop()
    TeamMembers: Team;
    @Prop()
    tasks: Task;
}
export const projectSchema=SchemaFactory.createForClass(project)