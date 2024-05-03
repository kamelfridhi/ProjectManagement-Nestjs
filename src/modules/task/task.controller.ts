import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) {
        return this.taskService.createTask(createTaskDto);
    }

    @Get()
    getAllTasks() {
        return this.taskService.getAllTasks();
    }

    @Get('sprint/:idsprint')
    getAllTasksbysprint(@Param('idsprint') id: string) {
        return this.taskService.getAllTasksbysprint(id);
    }
    @Get(':id')
    async getOneTask(@Param('id') id: string) {
        const task = await this.taskService.getOneTask(id);
        if (!task) throw new HttpException('Task not found', 404);
        return task;
    }

    @Patch(':id')
    async updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        const updatedTask = await this.taskService.updateTask(id, updateTaskDto);
        if (!updatedTask) throw new HttpException('Task not found', 404);
        return updatedTask;
    }

    @Delete(':id')
    async deleteTask(@Param('id') id: string) {
        const deletedTask = await this.taskService.deleteTask(id);
        if (!deletedTask) throw new HttpException('Task not found', 404);
        return deletedTask;
    }

    @Patch(':taskId/:statusId')
    async changeTaskStatus(@Param('taskId') taskId: string, @Param('statusId') statusId: string) {
        try {
            const updatedTask = await this.taskService.changeStatus(taskId, statusId);
            return updatedTask;
        } catch (error) {
            throw new HttpException(error.message, 400);
        }
    }

    @Patch('changeTaskStatusByName/:taskId/:statusName')
    async changeTaskStatusByName(@Param('taskId') taskId: string, @Param('statusName') statusName: string) {
        try {
            const updatedTask = await this.taskService.changeStatusByName(taskId, statusName);
            return updatedTask;
        } catch (error) {
            throw new HttpException(error.message, 400);
        }
    }
}
