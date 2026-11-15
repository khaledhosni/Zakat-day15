var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module.js';
import { LoginController } from './login.controller.js';
import { LoginService } from './login.service.js';
let LoginModule = class LoginModule {
};
LoginModule = __decorate([
    Module({
        imports: [
            PrismaModule,
            JwtModule.registerAsync({
                inject: [ConfigService],
                global: true,
                useFactory: (config) => ({
                    secret: config.getOrThrow('JWT_SECRET'),
                    signOptions: {
                        expiresIn: '1h',
                        algorithm: 'HS256',
                    },
                }),
            }),
        ],
        controllers: [LoginController],
        providers: [LoginService],
        exports: [JwtModule]
    })
], LoginModule);
export { LoginModule };
//# sourceMappingURL=login.module.js.map