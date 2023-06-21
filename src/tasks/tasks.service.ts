import { BadRequestException, Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task, TaskStatus } from './tasks.entity';
import { Repository } from 'typeorm';
import { AssignUserToTaskRequest, CreateTaskRequest, UpdateTaskRequest, UpdateTaskStatusRequest } from './tasks.request';
import { UsersService } from 'src/users/users.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
    public constructor(@InjectRepository(Task) private readonly tasksRepository: Repository<Task>, private readonly userService: UsersService) { }

    async getTasks() {
        return await this.tasksRepository.find();
    }

    async getTask(id: string) {
        const task =  await this.tasksRepository.findOneBy({ id });
        if (!task) {
            throw new NotFoundException("Task not found")
        }
        return task;
    }

    async createTask(createTaskRequest: CreateTaskRequest) {
        return await this.tasksRepository.insert(createTaskRequest);
    }

    async updateTask(id: string, updateTaskRequest: UpdateTaskRequest) {
        const task = await this.getTask(id);
        return await this.tasksRepository.update(id, updateTaskRequest);
    }

    async deleteTask(id: string) {
        const task = await this.getTask(id);
        return await this.tasksRepository.delete(id);
    }


    async assignUserToTask(assignUserToTaskRequest: AssignUserToTaskRequest) {
        const task = await this.getTask(assignUserToTaskRequest.taskId);
        const user = await this.userService.getUser(assignUserToTaskRequest.userId);
        if (!user) {
            throw new NotFoundException("User not found");
        }
        task.user = user;
        return await this.tasksRepository.save(task);
    }

    async changeTaskStatus(id: string, updateTaskStatusRequest: UpdateTaskStatusRequest) {
        const task = await this.getTask(id);
        const status = updateTaskStatusRequest.status;
        if (!(updateTaskStatusRequest.status in TaskStatus)) {
            throw new BadRequestException("Giver status unknown");
        }
        task.status = TaskStatus[status];
        return await this.tasksRepository.save(task);
    }

    @Cron('0 0 */48 * *') // Exécution toutes les 48 heures
    public async handleCron() {
        const changes = await this.tasksRepository.find();
        this.tasksRepository.save(changes);
        (new Logger(TasksService.name)).debug('Database (tasks) saved.');
    }
}
