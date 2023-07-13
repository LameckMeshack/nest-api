import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.services";
import { AuthDto } from "./dto/auth.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    async signup(@Body() dto: AuthDto) {
        return this.authService.signup();
    }

    @Post('signin')
    async signin() {
        return this.authService.login();
    }

}
