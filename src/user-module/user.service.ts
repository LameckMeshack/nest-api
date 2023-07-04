import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    findAll(): string {
        return 'TESTING ';
    }
    createUser(user: UserDto) {
        return user;
    }
}
