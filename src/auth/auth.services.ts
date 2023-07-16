import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";


@Injectable({})
export class AuthService {

    constructor(private prisma: PrismaService) { }

    async signup(regDto: AuthDto) {
        const hashPass = await argon.hash(regDto.password);
        try {
            const newUser = await this.prisma.user.create({
                data: {
                    email: regDto.email,
                    hash: hashPass,
                }
            });

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { hash, ...regUser } = newUser;

            return regUser;
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

    async signin(loginDto: AuthDto) {

        const user = await this.prisma.user.findUnique({
            where: { email: loginDto.email }
        });
        if (!user) {
            throw new ForbiddenException('Credentials Incorrect');
        }

        const isMatch = await argon.verify(user?.hash, loginDto.password);
        if (!isMatch) {
            throw new ForbiddenException('Credentials Incorrect');
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { hash, ...authUser } = user;

        return authUser;
    }



}
