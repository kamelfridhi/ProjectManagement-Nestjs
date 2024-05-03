import {BadRequestException, Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Sprint} from "src/schemas/sprint.schema";
import {Model} from "mongoose";
import {createSprintDto} from "./dto/createSprintDto";
import {Project} from "../../schemas/project.schema";
import {StatusService} from "../status/status.service";
import {CreateStatusDto} from "../status/dto/createStatus.dto";
import {TaskStatus} from "../../schemas/enums/task.status";

@Injectable()
export class sprintService {

  constructor(
    @InjectModel(Sprint.name) private sprintModel: Model<Sprint>,
    @InjectModel(Project.name) private prodjectModel: Model<Project>,
    private statusService: StatusService

  )
  {
  }

    async createSprint(createSprintDto: createSprintDto, idproject: string) {
        const newSprint = new this.sprintModel(createSprintDto);
        await newSprint.save();
        let status=new CreateStatusDto();
        status.status=TaskStatus.TODO;
        await this.statusService.createStatus(status, newSprint._id.toString())
        status.status=TaskStatus.INPROGRESS;
        await this.statusService.createStatus(status, newSprint._id.toString())
        status.status=TaskStatus.DONE;
        await this.statusService.createStatus(status, newSprint._id.toString())
        // Find the project by ID and update its sprints array
        const project = await this.prodjectModel.findById(idproject);
        if (!project) {
            throw new NotFoundException('Project not found');
        }

        project.sprints.push(newSprint);
        await project.save();

        // Return the updated project
        return project;
    }
    async getSprints(idproject?: string) {
        if (!idproject) {
            throw new BadRequestException('Project ID is required');
        }
        const project = await this.prodjectModel.findById(idproject).populate('sprints');
        if (!project) {
            throw new NotFoundException('Project not found');
        }
        return project.sprints;
    }


  deleteSprint(sprintName: string) {
    return this.sprintModel.findOneAndDelete({ sprintName });
  }
}