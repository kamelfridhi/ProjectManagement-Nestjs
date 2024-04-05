import { Body, Controller, Post,Get, Param, Patch, Delete,HttpException } from "@nestjs/common";
import { projectService } from "./project.service";
import { createProjectDto } from "./dto/createProjectDto";
import { updateProjectDto } from "./dto/updateProjectDto";
import { TeamService } from "../team-module/team.service";
import mongoose from "mongoose";
@Controller('projects')
export class projectController{
   constructor(private projectService:projectService, private teamService:TeamService){}
@Post()
    createProject(@Body()createProjectdto:createProjectDto){
        console.log(createProjectdto);
        return this.projectService.createProject(createProjectdto)
    }
    @Get()
    getAll(){
        return this.projectService.getProjects().exec();
    }
    @Post(':teamId/affectprojectteam/:projectId')
    async affectteamtoproject(@Param('teamId') teamId: string, @Param('projectId') projectId: string) {
      const updatedTeam = await this.teamService.affectteamtoproject(teamId, projectId);
      if (!updatedTeam) throw new HttpException('Team not found', 404);
      return updatedTeam;
    } 
    @Get(':projectName')
    getByName(@Param('projectName') projectName:string){
        return this.projectService.getProjectByName(projectName);
    }
    @Get(':id')
    getById(@Param('projectId') projectId:string){
        return this.projectService.getProjectById(projectId);
    }
    @Patch(':projectName')
    updateProject(@Param('projectName') projectName: string, @Body() updateProjectDto: updateProjectDto) {
        return this.projectService.updateProject(projectName, updateProjectDto);
    }


    @Delete(':projectName')
    deleteProject(@Param('projectName') projectName:string){
       return this.projectService.deleteProject(projectName);
    }

}