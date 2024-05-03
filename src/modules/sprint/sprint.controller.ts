import { Get, Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { sprintService } from './sprint.service';
import { createSprintDto } from './dto/createSprintDto';
import { Sprint } from 'src/schemas/sprint.schema'; // Import Sprint schema

@Controller('sprint')
export class sprintController {
    constructor(private sprintService: sprintService) {}

    @Post( ':idproject')
    async createSprint(@Body() createSprintDto: createSprintDto,@Param('idproject') idproject: string){
        console.log(idproject)
       return  await this.sprintService.createSprint(createSprintDto,idproject);
    }

    @Get(':idproject')
     getAll(@Param('idproject') idproject: string)  {
        return this.sprintService.getSprints(idproject); // Remove .exec() here
    }

    @Delete(':sprintName')
    async deleteProject(@Param('sprintName') sprintName: string): Promise<Sprint> {
        return await this.sprintService.deleteSprint(sprintName);
    }
}
