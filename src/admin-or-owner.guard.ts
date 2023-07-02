import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from './users/users.entity';
import { UsersService } from './users/users.service';
import { Role } from './enums/role.enum';
import { Entites } from './entities.enum';
import { JwtPayload } from './auth/jwt-payload';
import { TasksService } from './tasks/tasks.service';
import { Task } from './tasks/tasks.entity';

@Injectable()
export class AdminOrOwnerGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UsersService,
    private taskService: TasksService,
  ) {}

  private async getSubject(entityName: string, id: string): Promise<User | Task> {
    if (entityName === Entites.USER) {
      return await this.userService.getUser(id);
    }
    if (entityName === Entites.TASK) {
      return await this.taskService.getTask(id);
    }

    return null;
  }

  private async isOwner(
    loggedInUser: JwtPayload,
    subjectId: string,
    subjectEntity: string,
  ) {
    let subject = await this.getSubject(subjectEntity, subjectId);
    if (subjectEntity === Entites.USER) {
      subject = subject as User;
      if (subject?.id === loggedInUser.sub) {
        return true;
      }
    }
    if (subjectEntity === Entites.TASK) {
      subject = subject as Task;
      if (subject?.user.id === loggedInUser.sub) {
        return true;
      }
    }

    return false;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const entityName = this.reflector.get<string>(
      'entityName',
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    const loggedInUser = request.user;
    const subjectId = request.params.id;
    if (loggedInUser == null || !subjectId) return false;
    if (loggedInUser.roles[0] === Role.ADMIN) return true;

    return this.isOwner(loggedInUser, subjectId, entityName);
  }
}