import { IProcessor } from 'typeorm-fixtures-cli';
import { User } from '../users/users.entity';
import { Role } from '../enums/role.enum';
import * as bcrypt from 'bcrypt';

export default class UserProcessor implements IProcessor<User> {

    public preProcess(name: string, object: any): any {
        object.name = object.name.toLowerCase();
        object.email = object.email.toLowerCase();
        object.password = bcrypt.hashSync(object.password, 10);
        object.createdAt = new Date();
        object.role = [Role.USER];

        if (object.name === 'admin') {
            object.role.push(Role.ADMIN);
        }
        return object;
    }
    
    public postProcess(name: string, object: any): any {
        return object;
    }    
}