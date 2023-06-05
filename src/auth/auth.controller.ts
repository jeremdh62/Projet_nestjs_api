import { Body, Controller, Get, Post, Request, UseGuards, ValidationPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest } from './auth.request';
import { AuthGuard } from './auth.guard';
import { AllowAnonymos } from 'src/app.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @AllowAnonymos()
    @HttpCode(HttpStatus.OK)
    @Post("login")
    public login(@Body(ValidationPipe) loginRequest: LoginRequest ) {
        return this.authService.singIn(loginRequest.email, loginRequest.password);
    }

    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
