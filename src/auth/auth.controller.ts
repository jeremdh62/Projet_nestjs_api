import { Body, Controller, Get, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest } from './auth.request';

@Controller('auth')
export class AuthController {


    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post("login")
    public login(@Body(ValidationPipe) loginRequest: LoginRequest ) {
        return this.authService.singIn(loginRequest.email, loginRequest.password);
    }

    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
