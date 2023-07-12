import { Injectable } from "@nestjs/common";


@Injectable({})
export class AuthService {
    signup() {
        return 'This is a new user';
    }

    login() {
        return 'This is a user';
    }



}
