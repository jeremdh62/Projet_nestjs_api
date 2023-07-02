import { User } from "src/users/users.entity";
import { faker } from '@faker-js/faker';
import { CreateUserRequest } from "src/users/users.request";
import { UsersService } from "src/users/users.service";
import { Repository, DataSource } from "typeorm";
import { Task } from "src/tasks/tasks.entity";
import { Role } from "src/enums/role.enum";

const createData = async () => {
    const con = await new DataSource({
        type: 'postgres',
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: 5432,
        entities: [User, Task],
        synchronize: true
    }).initialize();

    const taskRepo = con.getRepository(Task);
    const userRepo = con.getRepository(User);

    // taskRepo.clear();
    // userRepo.clear();

    const admin = new User();
    admin.email = 'admin@test.com'
    admin.name = 'admin'
    admin.password = '$2b$10$ikT5An8SGB0WavlOWaBp7Oz8tFUNWrEYHNNBXKQiUICg9sj1SNaXC'; // password
    admin.role = [Role.ADMIN];

    await userRepo.save(admin);

    const user1 = new User();
    user1.email = 'user1@test.com'
    user1.name = 'user1'
    user1.password = '$2b$10$ikT5An8SGB0WavlOWaBp7Oz8tFUNWrEYHNNBXKQiUICg9sj1SNaXC'; // password
    user1.role = [Role.USER];
    await userRepo.save(user1);

    for (let i = 0; i < 10; i++) {
        const user = new User();
        user.email = faker.internet.email().toLowerCase();
        user.name = faker.internet.userName();
        user.password = '$2b$10$ikT5An8SGB0WavlOWaBp7Oz8tFUNWrEYHNNBXKQiUICg9sj1SNaXC'; // password
        if (i === 0) {
            user.role = [Role.ADMIN];
        } else {
            user.role = [Role.USER];
        }
        await userRepo.save(user);
    }

    for (let i = 0; i < 10; i++) {
        const task = new Task();
        task.title = faker.person.zodiacSign();
        task.description = faker.lorem.word();

        const allUsers = await userRepo.find();
        task.user = allUsers[faker.number.int({max: allUsers.length})];
        await taskRepo.save(task);
    }
}

export { createData }