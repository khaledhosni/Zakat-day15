import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
export function RolesGuard(...roles) {
    return class {
        canActivate(context) {
            const request = context
                .switchToHttp()
                .getRequest();
            const user = request.user;
            if (!user) {
                throw new UnauthorizedException('Authentication required');
            }
            let roles2 = roles.map(role => role.toUpperCase());
            if (!roles2.includes(user.role.toUpperCase())) {
                throw new ForbiddenException('Only administrators can access this resource');
            }
            return true;
        }
    };
}
//# sourceMappingURL=roles.guard.js.map