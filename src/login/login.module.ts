import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module.js';
import { LoginController } from './login.controller.js';
import { LoginService } from './login.service.js';




@Module({
  imports: [
  PrismaModule,

    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,

      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'),

        signOptions: {
          expiresIn: '1h',
          algorithm: 'HS256',
        },
      }),
    }),
  ],

  controllers: [LoginController],

  providers: [LoginService],
  exports:[JwtModule]
})
export class LoginModule {}