import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequest, UpdateUserRequest } from './users.request';

@Controller('users')
export class UsersController {
    public constructor(private usersService: UsersService) { }

    @Get()
    @HttpCode(200)
    public getUsers() {
        return this.usersService.getUsers();
    }

    @Get(':id')
    @HttpCode(200)
    public getUser(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.getUser(id);
    }

    @Post()
    @HttpCode(201)
    public createUser(@Body(ValidationPipe) createUserRequest: CreateUserRequest) {
        return this.usersService.createUser(createUserRequest);
    }

    @Patch(':id')
    @HttpCode(200)
    public updateUser(@Param('id', ParseUUIDPipe) id: string, @Body(ValidationPipe) UpdateUserRequest: UpdateUserRequest) {
        return this.usersService.updateUser(id, UpdateUserRequest);
    }

    @Delete(':id')
    @HttpCode(200)
    public deleteUser(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.deleteUser(id);
    }
}
