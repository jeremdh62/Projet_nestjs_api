import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UsersInterceptor implements NestInterceptor {
intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
    // Use the `map` operator to transform the user object
    map((user) => {
        // If the user object is an array, map over it and remove the password property from each element
        if (Array.isArray(user)) {
        return user.map(
            ({ password, ...userWithoutPassword }) => userWithoutPassword,
        );
        }

        // Otherwise, assume the user object is a single object and remove the password property
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }),
    );
}
}