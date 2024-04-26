
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
  /*
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
      const project = await this.projectModel.findById(projectId).exec();
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
  */
}