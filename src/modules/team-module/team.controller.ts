/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from "@nestjs/common";

import { CreateTaskDto } from "../task/dto/createTask.dto";
import { UpdateTaskDto } from "../task/dto/updateTask.dto";
import { TeamService } from "./team.service";
import { CreateTeamDto } from "./dto/createTeam.dto";
import { UpdateTeamDto } from "./dto/updateTeam.dto";

@Controller('team')
export class TeamController {

    constructor(private readonly teamService: TeamService) { }

    @Post()
    createTeam(@Body() createTeamDto: CreateTeamDto) {
        return this.teamService.createTeam(createTeamDto);
    }

    @Get()
    getAllTeams() {
        return this.teamService.getAllTeams();
    }

    @Get(':id')
    async getOneTeam(@Param('id') id: string) {
        const team = await this.teamService.getOneTeam(id);
        if (!team) throw new HttpException('Team not found', 404);
        return team;
    }

    @Patch(':id')
    async updateTeam(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
        const updatedTeam = await this.teamService.updateTeam(id, updateTeamDto);
        if (!updatedTeam) throw new HttpException('Team not found', 404);
        return updatedTeam;
    }

    @Delete(':id')
    async deleteTeam(@Param('id') id: string) {
        const deletedTeam = await this.teamService.deleteTeam(id);
        if (!deletedTeam) throw new HttpException('Team not found', 404);
        return deletedTeam;
    }


}
