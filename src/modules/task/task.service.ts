import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from 'src/schemas/task.schema';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
import {BaseService} from "../../global-utils/base.service";

@Injectable()
export class TaskService extends BaseService<Task> {
    constructor(
        @InjectModel(Task.name) private taskModel: Model<Task>,
    ) {
        super(taskModel);
    }

    async createTask(createTaskDto: CreateTaskDto) {
        return super.create(createTaskDto)
    }

    getAllTasks() {
        return this.taskModel.find().exec();
    }

    async getOneTask(id: string) {
        return this.findTaskById(id);
    }

    async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
        return super.update(id, updateTaskDto);
    }

    async deleteTask(id: string) {
        const deletedTask = await this.taskModel.findByIdAndDelete(id);
        return deletedTask;
    }

    private async findTaskById(id: string): Promise<Task | null> {
        try {
            return await this.taskModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Task not found');
        }
    }
}
