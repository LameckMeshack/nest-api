import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(config: ConfigService, private prisma: PrismaService) {
        super({
            jwtFromRequest:
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
        });
    }
    async validate(payload: { sub: number; email: string }) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: payload.sub
            }
        })
        if (!user) {
            // Handle the case when the user is not found
            throw new NotFoundException('error finding auth user');
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { hash, ...authUser } = user;
        return authUser;
    }
}

