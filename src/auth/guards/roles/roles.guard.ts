import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

import type { Request } from 'express';

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export function RolesGuard(...roles: string[]) {

 return class  implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

// 1. Get request
    const request = context
      .switchToHttp()
      .getRequest<AuthenticatedRequest>();

    // 2. Read authenticated user
    const user = request.user;

    // 3. User must be authenticated
    if (!user) {
      throw new UnauthorizedException(
        'Authentication required',
      );
    }

    // 4. Check ADMIN role

    
     let roles2=roles.map(role => role.toUpperCase());
    if (!roles2.includes(user.role.toUpperCase())) {
      throw new ForbiddenException(
        'Only administrators can access this resource',
      );
    }

    // 5. Allow access
    return true;
  }
}


}
