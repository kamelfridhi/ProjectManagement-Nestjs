
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Team } from "./team.schema";
import { Task } from "./task.schema";
import mongoose from "mongoose";
import { Sprint } from "./sprint.schema";
import { Board } from "./board.schema";

@Schema()
export class Project {

    @Prop()
    projectName: string;

    @Prop()
    projectDescription: string;

    @Prop()
    startDate: Date;

    @Prop()
    endDate: Date;

    @Prop()
    tasks: Task;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }] })
    teams: Team[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sprint' }] })
    sprints: Sprint[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Board' }] })
    boards: Board[];

}
export const projectSchema = SchemaFactory.createForClass(Project)