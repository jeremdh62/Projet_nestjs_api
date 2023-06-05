import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { Repository } from 'typeorm';
import { CreateTaskRequest, UpdateTaskRequest } from './tasks.request';

@Injectable()
export class TasksService {
    public constructor(@InjectRepository(Task) private readonly tasksRepository: Repository<Task>) { }

    async getTasks() {
        return await this.tasksRepository.find();
    }

    async getTask(id: string) {
        return await this.tasksRepository.findOneBy({ id });
    }

    async createTask(createTaskRequest: CreateTaskRequest) {
        return await this.tasksRepository.insert(createTaskRequest);
    }

    async updateUser(id: string, updateUserRequest: UpdateTaskRequest) {
        const user = await this.tasksRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException("User not found");
        }
        return await this.tasksRepository.update(id, updateUserRequest);
    }

    async deleteUser(id: string) {
        const user = await this.tasksRepository.findOneBy({ id });

        if (!user) {
            throw new NotFoundException("User not found");
        }

        return await this.tasksRepository.delete(id);
    }
}
