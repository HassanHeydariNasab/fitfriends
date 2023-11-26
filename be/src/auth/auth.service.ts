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

  /**
   * @param user - the user object to generate tokens for
   * @param options - the options object to use for generating tokens (Injected from AuthModule)
   */
  generateTokens(user: User) {
    const payload = { sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.options.accessTokenSecret,
        expiresIn: this.options.accessTokenExpiresIn,
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.options.refreshTokenSecret,
        expiresIn: this.options.refreshTokenExpiresIn,
      }),
    };
  }
}
