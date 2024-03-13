
/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  InternalServerErrorException,
  Param,
  Patch,
  Post
} from "@nestjs/common";

import { TeamService } from "./team.service";
import { CreateTeamDto } from "./dto/createTeam.dto";
import { UpdateTeamDto } from "./dto/updateTeam.dto";
import { AssignTaskDto } from "./dto/assignTask.dto";
import {TeamCategoryEnum} from "../../schemas/enums/team.category.enum";
import {User} from "../../schemas/user.schema";
import {UserRoles} from "../../schemas/enums/user.roles";

@Controller('team')
export class TeamController {
 
  constructor(private readonly teamService: TeamService) { }
  @Get('all/:teamId/:role')
  async getUsersNotInTeam(
      @Param('teamId') teamId: string,
      @Param('role') role: string,
  ): Promise<User[]> {
    try {
      const users = await this.teamService.getUsersNotInTeam(teamId,  role);
      return users;
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }
  @Get('categories')
  getCategories(): string[] {
    return Object.values(TeamCategoryEnum);
  }
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
  @Post(':teamId/members/:userId')
  async addMemberToTeam(@Param('teamId') teamId: string, @Param('userId') userId: string) {
    const updatedTeam = await this.teamService.addMemberToTeam(teamId, userId);
    if (!updatedTeam) throw new HttpException('Team not found', 404);
    return updatedTeam;
  }
  @Post(':teamId/affectprojectteam/:projectId')
  async affectteamtoproject(@Param('teamId') teamId: string, @Param('projectId') projectId: string) {
    const updatedTeam = await this.teamService.affectteamtoproject(teamId, projectId);
    if (!updatedTeam) throw new HttpException('Team not found', 404);
    return updatedTeam;
  } 
  @Patch(':taskId/affecttask/:userId')
  async assignTaskToMember(@Param('taskId') taskId: string, @Param('userId') userId: string): Promise<void> {
     await this.teamService.assignTaskToMember(taskId, userId);
  }
  @Get(':projectId/users')
  async getUsersInProject(@Param('projectId') projectId: string) {
    try {
      const users = await this.teamService.getUsersInProject(projectId);
      return { success: true, data: users };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  @Patch(':teamId/users/:userId')
  async removeUserFromTeam(
    @Param('teamId') teamId: string,
    @Param('userId') userId: string,
  ) {
    try {
      await this.teamService.removeUserFromTeam(teamId, userId);
      return { success: true, message: 'User removed from the team successfully' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Post(':teamId/members2/:userId')
  async addMemberToTeam2(@Param('teamId') teamId: string, @Param('userId') userId: string) {
     await this.teamService.addMemberToTeam2(teamId, userId);

  }
  @Get('notif/:userId')
  async displayNotifications(@Param('userId') userId: string) {
   return   await this.teamService.displayNotifications(userId);
  }
  @Post('/accept-invitation/:userId/:notificationId')
  async acceptTeamInvitation(
      @Param('userId') userId: string,
      @Param('notificationId') notificationId: string
  ) {
    try {
      await this.teamService.acceptTeamInvitation(userId, notificationId);
      return { message: 'Team invitation accepted successfully' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

}
