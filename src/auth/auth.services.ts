import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { config } from 'process';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
    ) { }

    async signup(regDto: AuthDto): Promise<{ access_token: string }> {
        const hashPass = await argon.hash(regDto.password);
        try {
            const newUser = await this.prisma.user.create({
                data: {
                    email: regDto.email,
                    hash: hashPass,
                },
            });
            return this.signToken(newUser.id, newUser.email);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('User already exists');
                }
            }
            throw new Error(error);
        }
    }

    async signin(loginDto: AuthDto): Promise<{ access_token: string }> {
        const user = await this.prisma.user.findUnique({
            where: { email: loginDto.email },
        });
        if (!user) {
            throw new ForbiddenException('Credentials Incorrect');
        }
        const isMatch = await argon.verify(user?.hash, loginDto.password);
        if (!isMatch) {
            throw new ForbiddenException('Credentials Incorrect');
        }
        return this.signToken(user.id, user.email);
    }

    async signToken(
        userId: number,
        email: string,
    ): Promise<{ access_token: string }> {
        const payload = { sub: userId, email };
        const secret = this.config.get<string>('JWT_SECRET');
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret,
        });
        return {
            access_token: token,
        };
    }
}
