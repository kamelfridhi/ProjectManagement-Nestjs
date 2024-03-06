import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from 'src/schemas/task.schema';
import {CreateTaskDto, StatusOfTaskDTO} from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
import {BaseService} from "../../global-utils/base.service";
import {TaskStatus} from "../../schemas/enums/task.status";
import {StatusOfTask} from "../../schemas/status.schema";
import {User} from "../../schemas/user.schema";

@Injectable()
export class TaskService extends BaseService<Task> {
    constructor(
        @InjectModel(Task.name) private taskModel: Model<Task>,
        @InjectModel(StatusOfTask.name) private statusOfTaskModel: Model<StatusOfTask>,
        @InjectModel(User.name) private userModel: Model<User>,

    ) {
        super(taskModel);
    }

    async createTask({assignPerson,...createTaskDto}: CreateTaskDto) {

        const newStatusTask = await this.statusOfTaskModel.findOne({status : TaskStatus.TODO}).exec()
        if (newStatusTask) {

            const assigneUser= await this.userModel.findById(assignPerson).exec();
            const newTask = new this.taskModel({
                ...createTaskDto,
                assignPerson: assigneUser._id,
                status: [newStatusTask],
            });


            return await newTask.save();
        }


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

    async changeStatus(taskId: string, newStatusId: string) {
        // Récupérer la tâche correspondant à l'ID donné
        const task = await this.taskModel.findById(taskId);

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        // Récupérer le statut correspondant à l'ID donné
        const newStatus = await this.statusOfTaskModel.findById(newStatusId);

        if (!newStatus) {
            throw new NotFoundException('Status not found');
        }



        // Mettre à jour le statut de la tâche avec le nouveau statut
        task.status.push(newStatus);

        // Enregistrer la tâche mise à jour avec le nouveau statut
        return task.save();
    }

    async changeStatusByName(taskId: string, newStatusName: string) {
        // Récupérer la tâche correspondant à l'ID donné
        const task = await this.taskModel.findById(taskId);

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        // Récupérer le statut correspondant à l'ID donné
        const newStatus = await this.statusOfTaskModel.findOne({status : newStatusName});

        if (!newStatus) {
            throw new NotFoundException('Status not found');
        }



        // Mettre à jour le statut de la tâche avec le nouveau statut
        task.status.push(newStatus);

        // Enregistrer la tâche mise à jour avec le nouveau statut
        return task.save();
    }



}
