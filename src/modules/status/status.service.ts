import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StatusOfTask} from '../../schemas/status.schema';
import { CreateStatusDto } from './dto/createStatus.dto';
import {Project} from "../../schemas/project.schema";
import {UpdateStatusDto} from "./dto/updateStatus.dto";

@Injectable()
export class StatusService {
    constructor(
        @InjectModel(StatusOfTask.name) private statusModel: Model<StatusOfTask>,
        @InjectModel(Project.name) private projectModel: Model<Project>,
    ) {}

    async createStatus(createStatusDto: CreateStatusDto , projectId: string): Promise<StatusOfTask> {

        const project = await this.projectModel.findById(projectId);
        const createdStatus = new this.statusModel({project,...createStatusDto});
        return await createdStatus.save();
    }

    async findAll(): Promise<StatusOfTask[]> {
        return this.statusModel.find().exec();
    }

    async findOne(id: string): Promise<StatusOfTask> {
        return this.statusModel.findById(id).exec();
    }

    async updateStatus(id: string, updateStatusDto: UpdateStatusDto): Promise<StatusOfTask> {
        const updatedStatus = await this.statusModel.findByIdAndUpdate(id, updateStatusDto, { new: true });
        if (!updatedStatus) {
            throw new Error('Status not found');
        }
        return updatedStatus;
    }

    async deleteStatus(id: string): Promise<StatusOfTask> {
        const deletedStatus = await this.statusModel.findByIdAndDelete(id);
        if (!deletedStatus) {
            throw new Error('Status not found');
        }
        return deletedStatus;
    }
}
