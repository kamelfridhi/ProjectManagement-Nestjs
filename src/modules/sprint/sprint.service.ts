import { Delete, Injectable,  NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Sprint } from "src/schemas/sprint.schema";
import { Model } from "mongoose";
import{createSprintDto} from"./dto/createSprintDto";
import { Team } from 'src/schemas/team.schema';
@Injectable()
export class sprintService {

  constructor(
    @InjectModel(Sprint.name) private sprintModel: Model<Sprint>,
    
    )
     {
      }

      createSprint(createSprintDto: createSprintDto) {
        const newSprint = new this.sprintModel(createSprintDto)
        return newSprint.save();
      }
      getSprints() {
        return this.sprintModel.find();
      }
      deleteSprint(sprintName: string) {
        return this.sprintModel.findOneAndDelete({ sprintName });
      }
}