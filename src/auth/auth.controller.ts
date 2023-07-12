import { Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.services";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    async signup() {
        return this.authService.signup();
    }


    @Post('signin')
    async signin() {
        return this.authService.login();
    }

}
