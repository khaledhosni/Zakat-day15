import { LoginService } from './login.service.js';
import { LoginDto } from './dto/login.dto.js';
export declare class LoginController {
    private readonly loginService;
    constructor(loginService: LoginService);
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
