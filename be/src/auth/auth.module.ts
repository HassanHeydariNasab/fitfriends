import { DynamicModule, Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AUTH_OPTIONS, AuthOptions } from './auth.options';

@Global()
@Module({})
export class AuthModule {
  static forRoot(options: AuthOptions): DynamicModule {
    return {
      module: AuthModule,
      imports: [PassportModule, JwtModule.register({})],
      providers: [
        { provide: AUTH_OPTIONS, useValue: options },
        AuthService,
        JwtStrategy,
      ],
      exports: [AuthService],
      global: true,
    };
  }
}
