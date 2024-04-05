import { Body, Controller, Post,Get, Param, Patch, Delete,HttpException } from "@nestjs/common";
import { sprintService } from "./sprint.service";
import { createSprintDto } from "./dto/createSprintDto";

import mongoose from "mongoose";
@Controller('sprint')

export class sprintController{
   constructor(private sprintService:sprintService){}
@Post()
    createSprint(@Body()createSprintdto:createSprintDto){
        console.log(createSprintdto);
        return this.sprintService.createSprint(createSprintdto)
    }
    @Get()
    getAll(){
        return this.sprintService.getSprints();
    }
    @Delete(':sprintName')
    deleteProject(@Param('sprintName') sprintName:string){
       return this.sprintService.deleteSprint(sprintName);
    }
}