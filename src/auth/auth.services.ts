import { Injectable } from "@nestjs/common";
// import {User, Bookmark} from '@prisma/client' prisma types from the schema


@Injectable({})
export class AuthService {
    signup() {
        return 'This is a new user';
    }

    login() {
        return 'This is a user';
    }



}
