import { env } from 'process';

import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { User } from './users.model';
import { UsersService } from './users.service';
import { UsersSecurity } from './users.security';
import { Group } from '../groups/groups.model';
import { Session } from '../sessions/sessions.model';
import { RedisModule } from 'src/redis/redis.module';
import { MessagingModule } from 'src/messaging/messaging.module';
import { SmsService } from 'src/messaging/sms.service';
import { USERS_SECURITY_OPTIONS } from './users.options';
import type { UsersSecurityOptions } from './users.options';

describe('usersService', () => {
  let userService: UsersService;
  let smsService: SmsService;
  let dataSource: DataSource;

  let sentCode: string | undefined;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ envFilePath: '.env.test', isGlobal: true }),
        TypeOrmModule.forRoot({
          type: 'postgres',
          url: env.DATABASE_URL,
          entities: [User, Group, Session],
          synchronize: true,
          dropSchema: true,
          logging: false,
        }),
        RedisModule.forRoot({ url: env.REDIS_URL }),
        MessagingModule.forRoot({
          sms: {
            verificationTemplate: env.KAVENEGAR_VERIFICATION_TEMPLATE,
            apiKey: env.KAVENEGAR_API_KEY,
          },
        }),
      ],
      providers: [
        UsersService,
        UsersSecurity,
        {
          provide: USERS_SECURITY_OPTIONS,
          useValue: { JWT_SECRET: env.JWT_SECRET } as UsersSecurityOptions,
        },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    smsService = module.get<SmsService>(SmsService);
    dataSource = module.get<DataSource>(DataSource);

    sentCode = undefined;
    jest.spyOn(smsService, 'sendOtp').mockImplementationOnce((_, code) => {
      sentCode = code;
      return Promise.resolve(true);
    });
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(smsService).toBeDefined();
  });

  it('should request OTP', async () => {
    const result = await userService.requestOtp({ phoneNumber: '09013792332' });
    expect(result).toBe(true);
    expect(sentCode).toHaveLength(5);
  });

  it('should register a new user', async () => {
    const result = await userService.requestOtp({ phoneNumber: '09013792332' });

    expect(result).toBe(true);
    expect(sentCode).toHaveLength(5);

    const verifyOtpResult = await userService.verifyOtp({
      phoneNumber: '09013792332',
      code: sentCode,
    });

    expect(verifyOtpResult).toBe(true);

    const token = await userService.registerUser({
      verifyOtpInput: { code: sentCode, phoneNumber: '09013792332' },
      createUserInput: {
        name: 'testUser1',
        tags: ['testTag1', 'testTag2'],
      },
    });

    expect(token).toBeDefined();

    const users = await dataSource.getRepository(User).find({
      where: { phoneNumber: '09013792332' },
    });

    expect(users).toHaveLength(1);

    const user = users[0];

    expect(user).toBeDefined();
    expect(user?.name).toBe('testUser1');
  });
});
