import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User
    ]),
    forwardRef(() => TasksModule),
  ],
  controllers: [
    UsersController
  ],
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [UsersService]
})
export class UsersModule {}
