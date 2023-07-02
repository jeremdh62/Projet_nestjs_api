import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
          Task
        ]),
        forwardRef(() => UsersModule),
    ],
    controllers: [
        TasksController
    ],
    providers: [TasksService],
    exports: [TasksService]
})
export class TasksModule {}
