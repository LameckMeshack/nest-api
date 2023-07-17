import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';


import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    // envFilePath: '.env',

  }), AuthModule, UserModule, BookmarkModule, PrismaModule],
})

export class AppModule { }
