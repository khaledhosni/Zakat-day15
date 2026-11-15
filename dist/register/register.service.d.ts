import { PrismaService } from '../prisma/prisma.service.js';
import { RegisterDto } from './dto/register.dto.js';
export declare class RegisterService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    register(dto: RegisterDto): Promise<{
        message: string;
        user: {
            user_id: string;
            created_at: Date;
            email: string;
            full_name: string;
            phone: string | null;
            is_active: boolean;
        };
    }>;
}
