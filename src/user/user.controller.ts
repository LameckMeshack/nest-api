import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators';
import { JwtAuthGuard } from 'src/auth/guard';


@Controller('users')
export class UserController {
    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMe(@GetUser() user: object) {
        return user;
    }
}
