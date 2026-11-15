import { ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare function RolesGuard(...roles: string[]): {
    new (): {
        canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
    };
};
