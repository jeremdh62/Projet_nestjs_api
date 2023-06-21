import { Body, Controller, Delete, Get, HttpCode, Logger, Param, ParseUUIDPipe, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AssignUserToTaskRequest, CreateTaskRequest, UpdateTaskRequest, UpdateTaskStatusRequest } from './tasks.request';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
    public constructor(private tasksService: TasksService) { }

    @Get()
    @HttpCode(200)
    public getTasks() {
        return this.tasksService.getTasks();
    }

    @Get(':id')
    @HttpCode(200)
    public getTask(@Param('id', ParseUUIDPipe) id: string) {
        return this.tasksService.getTask(id);
    }

    @Post()
    @HttpCode(201)
    public createTask(@Body(ValidationPipe) createTaskRequest: CreateTaskRequest) {
        return this.tasksService.createTask(createTaskRequest);
    }

    @Patch('assign-user')
    @HttpCode(200)
    public assignUserToTask(@Body(ValidationPipe) assignUserToTaskRequest: AssignUserToTaskRequest) {
        return this.tasksService.assignUserToTask(assignUserToTaskRequest);
    }

    @Patch(':id')
    @HttpCode(200)
    public updateTask(@Param('id', ParseUUIDPipe) id: string, @Body(ValidationPipe) UpdateUserRequest: UpdateTaskRequest) {
        return this.tasksService.updateTask(id, UpdateUserRequest);
    }

    @Delete(':id')
    @HttpCode(200)
    public deleteTask(@Param('id', ParseUUIDPipe) id: string) {
        return this.tasksService.deleteTask(id);
    }

    @Patch(':id/change-status')
    @HttpCode(200)
    public changeTaskStatus(@Param('id') id, @Body(ValidationPipe) updateTaskStatusRequest: UpdateTaskStatusRequest) {
        return this.tasksService.changeTaskStatus(id, updateTaskStatusRequest);
    }
}
