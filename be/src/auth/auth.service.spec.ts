import { env } from 'process';

import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let module: TestingModule;

  let service: AuthService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ envFilePath: '.env.test', isGlobal: true }),
        AuthModule.forRoot({
          accessTokenSecret: env.ACCESS_TOKEN_SECRET,
          refreshTokenSecret: env.REFRESH_TOKEN_SECRET,
          accessTokenExpiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
          refreshTokenExpiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
        }),
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
