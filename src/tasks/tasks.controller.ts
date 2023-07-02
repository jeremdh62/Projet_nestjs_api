import { Body, Controller, Delete, Get, HttpCode, Logger, Param, ParseUUIDPipe, Patch, Post, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AssignUserToTaskRequest, CreateTaskRequest, UpdateTaskRequest, UpdateTaskStatusRequest } from './tasks.request';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';
import { AdminOrOwnerGuard } from 'src/admin-or-owner.guard';
import { IsOwnerOrAdmin } from 'src/admin-or-owner.decorator';
import { Entites } from 'src/entities.enum';

@ApiTags('Tasks')
@ApiBearerAuth()
@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
    public constructor(private tasksService: TasksService) { }

    @Get()
    @HttpCode(200)
    @ApiOperation({ summary: 'Obtenir les tâches', description: 'Cette opération permet d\'obtenir toutes les tâches.' })
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({ status: 404, description: 'Not Found.'})
    public getTasks() {
        return this.tasksService.getTasks();
    }

    @Get(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Obtenir une tâche par ID', description: 'Cette opération permet d\'obtenir une tâche utilisant son ID.' })
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({ status: 404, description: 'Not Found.'})
    public getTask(@Param('id', ParseUUIDPipe) id: string) {
        return this.tasksService.getTask(id);
    }
    
    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: 'Créer une tâche' })
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({ status: 500, description: 'Internal Errors.'})
    @ApiResponse({ status: 404, description: 'Not Found.'})
    @ApiBody({ type: CreateTaskRequest })
    public createTask(@Body(ValidationPipe) createTaskRequest: CreateTaskRequest) {
        return this.tasksService.createTask(createTaskRequest);
    }

    @Patch('assign-user')
    @HttpCode(200)
    @ApiOperation({ summary: 'Associer un utilisateur à une tâche'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({ status: 404, description: 'Not Found.'})
    @ApiBody({ type: AssignUserToTaskRequest })
    public assignUserToTask(@Body(ValidationPipe) assignUserToTaskRequest: AssignUserToTaskRequest) {
        return this.tasksService.assignUserToTask(assignUserToTaskRequest);
    }

    @Patch(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Mettre à jour une tâche par ID' })
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({ status: 404, description: 'Not Found.'})
    @ApiBody({ type: UpdateTaskRequest })
    public updateTask(@Param('id', ParseUUIDPipe) id: string, @Body(ValidationPipe) UpdateUserRequest: UpdateTaskRequest) {
        return this.tasksService.updateTask(id, UpdateUserRequest);
    }
    
    @Delete(':id')
    @HttpCode(200)
    @UseGuards(AuthGuard, AdminOrOwnerGuard)
    @IsOwnerOrAdmin(Entites.TASK)
    @ApiOperation({ summary: 'Supprimer une tâche par ID'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({ status: 404, description: 'Not Found.'})
    public deleteTask(@Param('id', ParseUUIDPipe) id: string) {
        return this.tasksService.deleteTask(id);
    }

    @Patch(':id/change-status')
    @HttpCode(200)
    @ApiOperation({ summary: 'Changer le status d\'une tâche par ID', })
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({ status: 404, description: 'Not Found.'})
    @ApiBody({ type: UpdateTaskStatusRequest })
    public changeTaskStatus(@Param('id') id, @Body(ValidationPipe) updateTaskStatusRequest: UpdateTaskStatusRequest) {
        return this.tasksService.changeTaskStatus(id, updateTaskStatusRequest);
    }
}
