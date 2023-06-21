import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserRequest, UpdateUserRequest } from './users.request';
import { Role } from 'src/enums/role.enum';
const bcrypt = require('bcrypt');
import { Cron, CronExpression } from '@nestjs/schedule';
@Injectable()
export class UsersService {

    public constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) { }


    public getUsers() {
        return this.userRepo.find();
    }

    public getUser(id: string) {
        return this.userRepo.findOneBy({ id });
    }

    public createUser(createUserRequest: CreateUserRequest) {
        createUserRequest.password = bcrypt.hashSync(createUserRequest.password, 10);
        return this.userRepo.insert(createUserRequest);
    }

    public createAdmin(createUserRequest: CreateUserRequest) {
        createUserRequest.password = bcrypt.hashSync(createUserRequest.password, 10);
        const newUser = this.userRepo.create(createUserRequest);
        newUser.role = [Role.ADMIN];
        return this.userRepo.save(newUser);
    }

    public async updateUser(id: string, updateUserRequest: UpdateUserRequest) {

        const user = await this.userRepo.findOneBy({ id });

        if (!user) {
            throw new NotFoundException("User not found");
        }

        return this.userRepo.update(id, updateUserRequest);
    }

    public async deleteUser(id: string) {
        const user = await this.userRepo.findOneBy({ id });

        if (!user) {
            throw new NotFoundException("User not found");
        }

        return this.userRepo.delete(id);
    }

    public async getUserByEmail(email: string) {
        return this.userRepo.findOneBy({ email });
    }

    @Cron('0 0 */48 * *') // Exécution toutes les 48 heures
    public async handleCron() {
        const changes = await this.userRepo.find();
        this.userRepo.save(changes);
        (new Logger(UsersService.name)).debug('Database (users) saved.');
    }
    
}
