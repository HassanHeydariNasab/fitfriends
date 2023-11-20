import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as jwt from 'jsonwebtoken';

import { User } from './users.model';
import { USERS_SECURITY_OPTIONS } from './users.options';
import type { UsersSecurityOptions } from './users.options';

@Injectable()
export class UsersSecurity {
  constructor(
    @Inject(USERS_SECURITY_OPTIONS) private options: UsersSecurityOptions,
    private dataSource: DataSource,
  ) {}

  generateToken(user: User) {
    return jwt.sign({ id: user.id }, this.options.JWT_SECRET, {
      expiresIn: '1d',
    });
  }

  getUserId(token: string) {
    try {
      const payload = jwt.verify(token, this.options.JWT_SECRET);
      return payload['id'];
    } catch (error) {
      throw new HttpException('invalid_token', HttpStatus.UNAUTHORIZED);
    }
  }
}
