import { env } from 'process';

import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AUTH_OPTIONS } from './auth.options';
import { JwtAccessStrategy } from './jwt-access.strategy';
import { ConfigModule } from '@nestjs/config';

describe('AuthService', () => {
  let service: AuthService;
  let module: TestingModule;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ envFilePath: '.env.test', isGlobal: true }),
        PassportModule,
        JwtModule.register({}),
      ],
      providers: [
        JwtAccessStrategy,
        AuthService,
        {
          provide: AUTH_OPTIONS,
          useValue: {
            accessTokenSecret: env.ACCESS_TOKEN_SECRET,
            refreshTokenSecret: env.REFRESH_TOKEN_SECRET,
            accessTokenExpiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
            refreshTokenExpiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
