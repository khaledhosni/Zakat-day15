import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service.js';
import { LoginDto } from './dto/login.dto.js';
export declare class LoginService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login(dto: LoginDto): Promise<{
        access_token: string;
        token_type: string;
        expires_in: number;
        user: {
            user_id: string;
            email: string;
            full_name: string;
            phone: string | null;
            role: string;
        };
    }>;
}
