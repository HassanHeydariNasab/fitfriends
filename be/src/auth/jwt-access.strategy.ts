import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayload } from './jwt-payload';
import { AUTH_OPTIONS, AuthOptions } from './auth.options';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(@Inject(AUTH_OPTIONS) private options: AuthOptions) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: options.accessTokenSecret,
    });
  }

  validate(payload: JwtPayload) {
    console.log('payload', payload);
    return payload;
  }
}
