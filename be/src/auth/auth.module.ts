import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { JwtAccessStrategy } from './jwt-access.strategy';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';
import { AUTH_OPTIONS, AuthOptions } from './auth.options';

@Module({})
export class AuthModule {
  static forRoot(options: AuthOptions): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt-access' }),
        JwtModule.register({
          secret: options.accessTokenSecret,
          signOptions: { expiresIn: options.accessTokenExpiresIn },
        }),
      ],
      providers: [
        { provide: AUTH_OPTIONS, useValue: options },
        AuthService,
        JwtAccessStrategy,
        JwtRefreshStrategy,
      ],
      exports: [AuthService],
      global: true,
    };
  }
}
