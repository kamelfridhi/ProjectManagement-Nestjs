import { Body, Controller, Post,Get, Param, Patch, Delete } from "@nestjs/common";
import { projectService } from "./project.service";
import { createProjectDto } from "./dto/createProjectDto";
import { updateProjectDto } from "./dto/updateProjectDto";
import mongoose from "mongoose";
@Controller('projects')
export class projectController{
   constructor(private projectService:projectService){}
@Post()
    createProject(@Body()createProjectdto:createProjectDto){
        console.log(createProjectdto);
        return this.projectService.createProject(createProjectdto)
    }
    @Get()
    getAll(){
        return this.projectService.getProjects().exec();
    }
    @Get(':projectName')
    getByName(@Param('projectName') projectName:string){
        return this.projectService.getProjectByName(projectName);
    }
    @Patch(':projectName')
    updateProject(@Param('projectName')projectName: string, @Body() updateProjectDto:updateProjectDto){
        return this.projectService.updateProject(projectName,updateProjectDto)
    }

    @Delete(':projectName')
    deleteProject(@Param('projectName') projectName:string){
       return this.projectService.deleteProject(projectName);
    }

}