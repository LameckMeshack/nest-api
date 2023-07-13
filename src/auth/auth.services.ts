import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";


@Injectable({})
export class AuthService {

    constructor(private prisma: PrismaService) { }

    async signup(regDto: AuthDto) {
        const hash = await argon.hash(regDto.password);
        try {
            // const user = await this.prisma.user.findUnique({
            //     where: {
            //         email: regDto.email
            //     }
            // });
            // if (user) {
            //     throw new Error('User already exists');
            // }

            const newUser = await this.prisma.user.create({
                data: {
                    email: regDto.email,
                    hash,
                }
            });

            // delete newUser.hash;

            // console.log(newUser)
            return newUser;
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('User already exists');
                }
            }
            throw new Error(error);
        }
    }

    login() {
        return 'This is a user';
    }



}
