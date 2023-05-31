import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        private usersService: UsersService,
    ) {}

    async singIn(email: string, password: string) {
        const user = await this.usersService.getUserByEmail(email);

        if (!bcrypt.compareSync(password.trim(), user?.password.trim())) {
            throw new UnauthorizedException();
        }
        const payload = { email: user.email, sub: user.id };
        return {
        access_token: await this.jwtService.signAsync(payload),
        };
    }

}
