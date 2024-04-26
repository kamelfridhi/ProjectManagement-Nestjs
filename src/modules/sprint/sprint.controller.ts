import { Get, Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { sprintService } from './sprint.service';
import { createSprintDto } from './dto/createSprintDto';
import { Sprint } from 'src/schemas/sprint.schema'; // Import Sprint schema

@Controller('sprint')
export class sprintController {
    constructor(private sprintService: sprintService) {}

    @Post()
    async createSprint(@Body() createSprintDto: createSprintDto): Promise<Sprint> {
        return await this.sprintService.createSprint(createSprintDto);
    }

    @Get()
    async getAll(): Promise<Sprint[]> {
        return await this.sprintService.getSprints(); // Remove .exec() here
    }

    @Delete(':sprintName')
    async deleteProject(@Param('sprintName') sprintName: string): Promise<Sprint> {
        return await this.sprintService.deleteSprint(sprintName);
    }
}
