
import { Delete, Injectable, Param } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { ProjectModule } from "./project.module"; 
import { project } from "src/schemas/project.schema";
import { createProjectDto } from "./dto/createProjectDto";
import { updateProjectDto } from "./dto/updateProjectDto";
@Injectable()
export class projectService{
constructor(
    @InjectModel(project.name) private projectModel: Model<project>){}
    createProject(createProjectDto:createProjectDto){
        const newProject = new this.projectModel(createProjectDto)
        return newProject.save();
    }
   getProjects(){
    return this.projectModel.find();
   }
   getProjectByName(projectName : string){
    return this.projectModel.findOne({projectName});
   }
   updateProject(projectName:string,updateProjectDto:updateProjectDto){
   return this.projectModel.findOneAndUpdate({projectName},updateProjectDto);
   }
  deleteProject(projectName:string){
    return this.projectModel.findOneAndDelete({projectName});
  }
}