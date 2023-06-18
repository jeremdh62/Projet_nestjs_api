import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from './users/users.entity';
import { UsersService } from './users/users.service';
import { Role } from './enums/role.enum';

@Injectable()
export class AdminOrOwnerGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UsersService,
  ) {}

  private getSubject(entityName: string, id: string): Promise<User> {
    if (entityName === Role.USER) {
      return this.userService.getUser(id);
    }

    return null;
  }

  private async isOwner(
    loggedInUser: User,
    subjectId: string,
    subjectEntity: string,
  ) {
    const subject = await this.getSubject(subjectEntity, subjectId);
    if (subjectEntity === Role.USER && subject?.id === loggedInUser.id) {
      return true;
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
    if (loggedInUser.role === Role.ADMIN) return true;

    return this.isOwner(loggedInUser, subjectId, entityName);
  }
}