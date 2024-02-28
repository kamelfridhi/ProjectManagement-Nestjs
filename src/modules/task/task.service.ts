import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from 'src/schemas/task.schema';
import {CreateTaskDto, StatusOfTaskDTO} from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
import {BaseService} from "../../global-utils/base.service";
import {TaskStatus} from "../../schemas/enums/task.status";
import {StatusOfTask} from "../../schemas/status.schema";

@Injectable()
export class TaskService extends BaseService<Task> {
    constructor(
        @InjectModel(Task.name) private taskModel: Model<Task>,
        @InjectModel(StatusOfTask.name) private statusOfTaskModel: Model<StatusOfTask>,

    ) {
        super(taskModel);
    }

    async createTask(createTaskDto: CreateTaskDto) {

        const newStatusTask = new this.statusOfTaskModel({
            status: TaskStatus.TODO,
        });

        const savedStatusTask = await newStatusTask.save();

        const newTask = new this.taskModel({
            ...createTaskDto,
            status: [savedStatusTask],
        });

        return newTask.save();
    }




    async getAllTasks() {
        const tasks = await this.taskModel.find().populate('status').exec();
        return tasks;
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
