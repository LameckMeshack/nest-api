import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Get()
    findAll(): string {
        return this.userService.findAll();
    }

    @Post()
    @UsePipes(new ValidationPipe())
    createUser(@Body() user: UserDto) {
        return this.userService.createUser(user);
    }
}
