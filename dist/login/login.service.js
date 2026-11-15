var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, UnauthorizedException, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';
let LoginService = class LoginService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async login(dto) {
        const email = dto.email.trim().toLowerCase();
        const user = await this.prisma.users.findUnique({
            where: {
                user_id: BigInt(1001),
            },
            include: {
                user_roles: {
                    include: {
                        roles: true,
                    },
                },
            },
        });
        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }
        const passwordValid = await bcrypt.compare(dto.password, user.password_hash);
        if (!passwordValid) {
            throw new UnauthorizedException('Invalid email or password');
        }
        if (!user.is_active) {
            throw new UnauthorizedException('Account is inactive');
        }
        const payload = {
            sub: user.user_id.toString(),
            email: user.email,
            role: user.user_roles[0].roles.role_name
        };
        const accessToken = await this.jwtService.signAsync(payload);
        return {
            access_token: accessToken,
            token_type: 'Bearer',
            expires_in: 3600,
            user: {
                user_id: user.user_id.toString(),
                email: user.email,
                full_name: user.full_name,
                phone: user.phone,
                role: user.user_roles[0].roles.role_name
            },
        };
    }
};
LoginService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        JwtService])
], LoginService);
export { LoginService };
//# sourceMappingURL=login.service.js.map