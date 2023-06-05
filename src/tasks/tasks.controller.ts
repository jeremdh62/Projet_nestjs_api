import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskRequest, UpdateTaskRequest } from './tasks.request';

@Controller('tasks')
export class TasksController {
    public constructor(private tasksService: TasksService) { }

    @Get()
    @HttpCode(200)
    public getUsers() {
        return this.tasksService.getTasks();
    }

    @Get(':id')
    @HttpCode(200)
    public getUser(@Param('id', ParseUUIDPipe) id: string) {
        return this.tasksService.getTask(id);
    }

    @Post()
    @HttpCode(201)
    public createUser(@Body(ValidationPipe) createTaskRequest: CreateTaskRequest) {
        return this.tasksService.createTask(createTaskRequest);
    }

    @Patch(':id')
    @HttpCode(200)
    public updateUser(@Param('id', ParseUUIDPipe) id: string, @Body(ValidationPipe) UpdateUserRequest: UpdateTaskRequest) {
        return this.tasksService.updateUser(id, UpdateUserRequest);
    }

    @Delete(':id')
    @HttpCode(200)
    public deleteUser(@Param('id', ParseUUIDPipe) id: string) {
        return this.tasksService.deleteUser(id);
    }
}
