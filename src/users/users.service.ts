import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserRequest, UpdateUserRequest } from './users.request';

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
        return this.userRepo.insert(createUserRequest);
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
    
}
