import { env } from 'process';

import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SessionsService } from './sessions.service';
import { Session } from './sessions.model';
import { User } from '../users/users.model';
import { Login } from '../logins/logins.model';
import { Group } from '../groups/groups.model';
import { OtpModule } from '../otp/otp.module';
import { Otp } from '../otp/otp.model';

describe('SessionsService', () => {
  let service: SessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ envFilePath: '.env.test', isGlobal: true }),
        TypeOrmModule.forRoot({
          type: 'postgres',
          url: env.DATABASE_URL,
          entities: [User, Group, Session, Otp, Login],
          synchronize: false,
          logging: false,
        }),
        OtpModule,
      ],
      providers: [SessionsService],
    }).compile();

    service = module.get<SessionsService>(SessionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
