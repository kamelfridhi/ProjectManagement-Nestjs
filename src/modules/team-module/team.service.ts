/*
https://docs.nestjs.com/providers#services
*/

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/global-utils/base.service';
import { Team } from 'src/schemas/team.schema';
import { CreateTeamDto } from "./dto/createTeam.dto";
import { UpdateTaskDto } from "../task/dto/updateTask.dto";
import { UpdateTeamDto } from "./dto/updateTeam.dto";
import { User } from "../../schemas/user.schema";
import { Project } from "../../schemas/project.schema";
import { Task } from 'src/schemas/task.schema';

@Injectable()
export class TeamService extends BaseService<Team> {




    constructor(

        @InjectModel(Team.name) private TeamModel: Model<Team>,
        @InjectModel(User.name) private UserModel: Model<User>,
        @InjectModel(Project.name) private ProjectModel: Model<Project>,
        @InjectModel(Task.name) private readonly taskModel: Model<Task>,

    ) {
        super(TeamModel);
    }
    async createTeam(createTaskDto: CreateTeamDto) {
        return super.create(createTaskDto)
    }

    getAllTeams() {
        return super.findAll();
     }

     getOneTeam(id: string) {
         return super.findOne(id);
     }
 
     updateTeam(id: string, updateTeamDto: UpdateTeamDto) {
         return super.update(id,updateTeamDto);
     }
 
     async deleteTeam(id: string) {
       try {
         // Find the team to delete
         const team = await this.TeamModel.findById(id);
         if (!team) {
           throw new NotFoundException('Team not found');
         }

         // Find all users belonging to the team
         const users = await this.UserModel.find({ 'teams': id });
         if (users.length > 0) {
           // Remove the team reference from each user
           await Promise.all(users.map(async (user) => {
             user.teams = null;
             await user.save();
           }));
         }

         // Delete the team
         await super.remove(id);

         return { success: true };
       } catch (error) {
         throw new Error(error.message);
       }
     }
  async addMemberToTeam(teamId: string, userId: string): Promise<Team | null> {
    try {
      const team = await this.TeamModel.findById(teamId);
      if (!team) {
        throw new NotFoundException('Team not found');
      }

      // Update the user document
      const user = await this.UserModel.findByIdAndUpdate(userId,{teams:team});

      await user.save();

      // Update the team document
      team.users.push(user);
      await team.save();

      return team;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async affectteamtoproject(teamId: string, projectId: string) {
    try {
      const team = await this.TeamModel.findById(teamId);
      if (!team) {
        throw new NotFoundException('Team not found');
      }


      // Check if the user already exists in the team
      if (team.project.map(project => project.toString()).includes(projectId)) {
        return team;
      }
      const project = await this.ProjectModel.findById(projectId).exec();
      if (!project) {
        throw new NotFoundException('project not found');
      } else {
        project.teams.push(team);
      }
      team.project.push(project);
      await team.save(); // Save the updated team document
      await project.save(); // Save the updated team document

      return team;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async assignTaskToMember(taskId: string, userId: string): Promise<void> {
    const user = await this.UserModel.findById(userId); // Await the result
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const task = await this.taskModel.findByIdAndUpdate(taskId, { assignedTo: user }).exec();
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    await task.save();
  }
  async getUsersInProject(projectId: string): Promise<User[]> {
    const teams = await this.TeamModel.find({ project: projectId }).exec();

    console.log("Teams:", teams); // Log teams to check if all teams associated with the project are retrieved

    // Extract user IDs from all teams
    const userIds = teams.flatMap(team => team.users.map(user => user));

    console.log("User IDs:", userIds); // Log user IDs to ensure you're getting users from all teams

    // Step 2: Query users with the IDs obtained
    const users = await this.UserModel.find({ _id: { $in: userIds } }).exec();

    return users;
  }
  async removeUserFromTeam(teamId: string, userId: string) {
    try {
      // Find the team
      const team = await this.TeamModel.findById(teamId);
      if (!team) {
        throw new NotFoundException('Team not found');
      }

      // Find the user
      const user = await this.UserModel.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Check if the user is a member of the team
      if (!user.teams || user.teams.toString() !== teamId) {
        throw new ConflictException('User is not a member of the specified team');
      }

      // Remove the user from the team's users array
      team.users = team.users.filter(user => user.toString() !== userId);
      await team.save();

      // Remove the team reference from the user
      user.teams = null;
      await user.save();

      return { success: true };
    } catch (error) {
      throw new Error(error.message);
    }
  }

}
