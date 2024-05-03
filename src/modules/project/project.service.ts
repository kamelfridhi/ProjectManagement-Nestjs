
import { Delete, Injectable,  NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Team } from 'src/schemas/team.schema';
import { ProjectModule } from "./project.module";
import { Project } from "src/schemas/project.schema";
import { createProjectDto } from "./dto/createProjectDto";
import { updateProjectDto } from "./dto/updateProjectDto";

@Injectable()
export class projectService {

  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    @InjectModel(Team.name) private TeamModel: Model<Team>,

  )
  { }

  createProject(createProjectDto: createProjectDto) {
    const newProject = new this.projectModel(createProjectDto)

    return newProject.save();
  }

  getProjects() {
    return this.projectModel.find();
  }

  getProjectByName(projectName: string) {
    return this.projectModel.findOne({ projectName });
  }

  getProjectById(projectId: string) {
    return this.projectModel.findOne({ projectId});
  }

  updateProject(projectName: string, updateProjectDto: updateProjectDto) {
    return this.projectModel.findOneAndUpdate({ projectName }, updateProjectDto);
  }

  deleteProject(projectName: string) {
    return this.projectModel.findOneAndDelete({ projectName });
  }

  async affectteamtoproject(teamId: string, projectId: string) {
    console.log(teamId, projectId)
    try {

      let team = await this.TeamModel.findById(teamId).exec();
      if (!team) {
        throw new NotFoundException('Team not found');
      }



      const project = await this.projectModel.findById(projectId).exec();
      console.log(project)
      if (!project) {
        throw new NotFoundException('project not found');
      } else {
        if(!project.teams.find((team)=>team.toString()===teamId)){
          project.teams.push(team._id.toString());
        }

      }
      await project.save(); // Save the updated team document

      return team;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getTeambyproject(projectId: string) {
    const project = await this.projectModel.findById(projectId).exec();
    let teams=[]
    for (const team of project.teams) {
      teams.push(await this.TeamModel.findById(team).exec())
    }
    return teams;
  }
  async disaffectteamfromproject(teamId: string, projectId: string) {
    console.log(teamId, projectId);
    try {
      let team = await this.TeamModel.findById(teamId).exec();
      if (!team) {
        throw new NotFoundException('Team not found');
      }

      const project = await this.projectModel.findById(projectId).exec();
      console.log(project);
      if (!project) {
        throw new NotFoundException('Project not found');
      } else {
        // Find the index of the team ID in the project's teams array
        const index = project.teams.findIndex(team => team.toString() === teamId);
        if (index !== -1) {
          // Remove the team ID from the project's teams array
          project.teams.splice(index, 1);
        }
      }

      await project.save(); // Save the updated project document

      return team;
    } catch (error) {
      throw new Error(error.message);
    }
  }

}