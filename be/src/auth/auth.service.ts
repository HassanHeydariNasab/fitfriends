import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/entities/users/users.model';

import { AUTH_OPTIONS, AuthOptions } from './auth.options';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(AUTH_OPTIONS) private options: AuthOptions,
  ) {}

  generateTokens(user: User) {
    const payload = { sub: user.id };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.options.accessTokenSecret,
      expiresIn: this.options.accessTokenExpiresIn,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.options.refreshTokenSecret,
      expiresIn: this.options.refreshTokenExpiresIn,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
