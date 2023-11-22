import { env } from 'process';

import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { RedisModule } from 'src/redis/redis.module';
import { MessagingModule } from 'src/messaging/messaging.module';
import { RedisService } from 'src/redis/redis.service';
import { SmsService } from 'src/messaging/sms.service';

import { Session } from '../sessions/sessions.model';
import { USERS_SECURITY_OPTIONS } from '../users/users.options';
import type { UsersSecurityOptions } from '../users/users.options';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.model';
import { UsersSecurity } from '../users/users.security';

import { Group } from './groups.model';
import { GroupsService } from './groups.service';

describe('groupsService', () => {
  let groupsService: GroupsService;
  let userService: UsersService;
  let smsService: SmsService;
  let dataSource: DataSource;
  let redisService: RedisService;

  let sentCode: string | undefined;

  beforeAll(async () => {
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
        GroupsService,
        UsersService,
        UsersSecurity,
        {
          provide: USERS_SECURITY_OPTIONS,
          useValue: { JWT_SECRET: env.JWT_SECRET } as UsersSecurityOptions,
        },
      ],
    }).compile();

    groupsService = module.get<GroupsService>(GroupsService);
    userService = module.get<UsersService>(UsersService);
    smsService = module.get<SmsService>(SmsService);
    dataSource = module.get<DataSource>(DataSource);
    redisService = module.get<RedisService>(RedisService);

    redisService.r.flushAll();

    sentCode = undefined;
    jest.spyOn(smsService, 'sendOtp').mockImplementation((_, code) => {
      sentCode = code;
      return Promise.resolve(true);
    });
  });

  it('should be defined', () => {
    expect(groupsService).toBeDefined();
    expect(userService).toBeDefined();
    expect(smsService).toBeDefined();
    expect(redisService).toBeDefined();
    expect(dataSource).toBeDefined();
  });

  describe('register a new user and create a group', () => {
    const userName = 'testUser1';

    it('should request OTP', async () => {
      const result = await userService.requestOtp({
        phoneNumber: '09013792332',
      });
      expect(result).toBe(true);
      expect(sentCode).toHaveLength(5);
    });

    it('should verify OTP and register a new user', async () => {
      const verifyOtpResult = await userService.verifyOtp({
        phoneNumber: '09013792332',
        code: sentCode,
      });

      expect(verifyOtpResult).toEqual({ isRegistered: false });

      const token = await userService.registerUser({
        verifyOtpInput: { code: sentCode, phoneNumber: '09013792332' },
        createUserInput: {
          name: userName,
          tags: ['testTag1', 'testTag2'],
        },
      });

      expect(token).toBeDefined();
    });

    it('should create a group', async () => {
      const result = await groupsService.createGroup({
        name: 'testGroup1',
        description: 'testDescription1',
      });
      expect(result).toBe(true);

      const groups = await dataSource.getRepository(Group).find({
        where: { name: 'testGroup1' },
      });
      expect(groups).toHaveLength(1);
    });
  });
});
