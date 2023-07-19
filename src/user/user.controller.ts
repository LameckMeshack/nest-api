import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.services';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UserController {
    constructor(private authService: AuthService) { }
    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMe() {
        return 'User information';
    }
}
