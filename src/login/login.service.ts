import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';


import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class LoginService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    // Step 1: Normalize email
    const email = dto.email.trim().toLowerCase();

    // // Step 2: Find user in shop.users
    // const user = await this.prisma.users.findFirst({
    //   where: {
    //     email: {
    //       equals: email,
    //       mode: 'insensitive',
    //     },
    //   },
    // });


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

    // Step 3: Check user exists
    if (!user) {
      throw new UnauthorizedException(
        'Invalid email or password',
      );
    }

    // Step 4: Verify password
    const passwordValid = await bcrypt.compare(
      dto.password,
      user.password_hash,
    );

    if (!passwordValid) {
      throw new UnauthorizedException(
        'Invalid email or password',
      );
    }

    // Step 5: Check account is active
    if (!user.is_active) {
      throw new UnauthorizedException(
        'Account is inactive',
      );
    }

    // Step 6: Prepare JWT payload

    // let roleNumber= Math.floor(Math.random() * 10);

    // let role = roleNumber < 5 ? "USER" : "ADMIN";

    const payload = {
      sub: user.user_id.toString(),
      email: user.email,
      role: user.user_roles[0].roles.role_name
    };

    // Step 7: Generate JWT
    const accessToken =
      await this.jwtService.signAsync(payload);
    

    // Step 8: Return response
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
}