import { Body, Controller, Get, Post, Request, UseGuards, ValidationPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest } from './auth.request';
import { AllowAnonymos } from 'src/app.decorator';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @AllowAnonymos()
    @HttpCode(HttpStatus.OK)
    @Post("login")
    @ApiOperation({ summary: 'Se connecter' })
    @ApiResponse({ status: 401, description: 'Unauthorized.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({ status: 404, description: 'Not Found.'})
    public login(@Body(ValidationPipe) loginRequest: LoginRequest ) {
        return this.authService.singIn(loginRequest.email, loginRequest.password);
    }
}
