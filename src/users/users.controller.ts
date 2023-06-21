import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequest, UpdateUserRequest } from './users.request';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { AllowAnonymos } from 'src/app.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminOrOwnerGuard } from 'src/admin-or-owner.guard';
import { IsOwnerOrAdmin } from 'src/admin-or-owner.decorator';
import { Entites } from 'src/entities.enum';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
    public constructor(private usersService: UsersService) { }

    @Get()
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Obtenir les utilisateurs', description: 'Cette opération permet d\'obtenir tous les utilisateurs.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({ status: 404, description: 'Not Found.'})
    public getUsers() {
        return this.usersService.getUsers();
    }

    @Get(':id')
    @HttpCode(200)
    @UseGuards(AdminOrOwnerGuard)
    @IsOwnerOrAdmin(Entites.USER)    
    @ApiOperation({ summary: 'Obtenir un utilisateur par ID'})
    @ApiResponse({ status: 401, description: 'Unauthorized.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({ status: 404, description: 'Not Found.'})
    @ApiBody({ type: ParseUUIDPipe })
    public getUser(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.getUser(id);
    }

    @Post()
    @AllowAnonymos()
    @HttpCode(201)
    @ApiOperation({ summary: 'Créer un utilisateur'})
    @ApiResponse({ status: 401, description: 'Unauthorized.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({ status: 404, description: 'Not Found.'})
    @ApiBody({ type: CreateUserRequest })
    public createUser(@Body(ValidationPipe) createUserRequest: CreateUserRequest) {
        return this.usersService.createUser(createUserRequest);
    }

    @Post('admin')
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @HttpCode(201)
    @ApiOperation({ summary: 'Créer un compte admininstrateur'})
    @ApiResponse({ status: 401, description: 'Unauthorized.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({ status: 404, description: 'Not Found.'})
    @ApiBody({ type: CreateUserRequest })
    public createAdmin(@Body(ValidationPipe) createUserRequest: CreateUserRequest) {
        return this.usersService.createAdmin(createUserRequest);
    }

    @Patch(':id')
    @HttpCode(200)
    @UseGuards(AdminOrOwnerGuard)
    @IsOwnerOrAdmin(Entites.USER)
    @ApiOperation({ summary: 'Mettre à jour un utilisateur par ID'})
    @ApiResponse({ status: 401, description: 'Unauthorized.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({ status: 404, description: 'Not Found.'})
    @ApiBody({ type: UpdateUserRequest })
    public updateUser(@Param('id', ParseUUIDPipe) id: string, @Body(ValidationPipe) UpdateUserRequest: UpdateUserRequest) {
        return this.usersService.updateUser(id, UpdateUserRequest);
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard, AdminOrOwnerGuard)
    @HttpCode(200)
    @ApiOperation({ summary: 'Supprimer un utilisateur par ID'})
    @ApiResponse({ status: 401, description: 'Unauthorized.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({ status: 404, description: 'Not Found.'})
    @ApiBody({ type: ParseUUIDPipe })
    public deleteUser(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.deleteUser(id);
    }
}
