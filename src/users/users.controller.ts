import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequest, UpdateUserRequest } from './users.request';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { AllowAnonymos } from 'src/app.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
    public constructor(private usersService: UsersService) { }

    @Get()
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
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
    @AllowAnonymos()
    @HttpCode(201)
    public createUser(@Body(ValidationPipe) createUserRequest: CreateUserRequest) {
        return this.usersService.createUser(createUserRequest);
    }

    @Post('admin')
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @HttpCode(201)
    public createAdmin(@Body(ValidationPipe) createUserRequest: CreateUserRequest) {
        return this.usersService.createAdmin(createUserRequest);
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
