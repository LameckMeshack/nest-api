import { Injectable } from "@nestjs/common";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaService } from "src/prisma/prisma.service";


@Injectable({})
export class AuthService {

    constructor(private prisma: PrismaService) { }

    async signup(regDto: AuthDto) {
        const hash = await argon.hash(regDto.password);

        const newUser = await this.prisma.user.create({
            data: {
                email: regDto.email,
                hash,
            }
        });

        delete newUser.hash;

        console.log(newUser)
        return newUser;
    }

    login() {
        return 'This is a user';
    }



}
