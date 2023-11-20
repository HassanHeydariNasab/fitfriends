import { DynamicModule, Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UsersSecurity } from './users.security';
import { USERS_SECURITY_OPTIONS } from './users.options';
import type { UsersOptions } from './users.options';

@Module({})
export class UsersModule {
  static forRoot(options: UsersOptions): DynamicModule {
    return {
      module: UsersModule,
      providers: [
        { provide: USERS_SECURITY_OPTIONS, useValue: options.security },
        UsersSecurity,
      ],
      exports: [UsersService, UsersSecurity, UsersResolver],
    };
  }
}
