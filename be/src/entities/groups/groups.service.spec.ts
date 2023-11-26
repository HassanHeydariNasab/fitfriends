import { env } from 'process';

import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { UsersModule } from 'src/entities/users/users.module';
import { UsersService } from 'src/entities/users/users.service';
import { User } from 'src/entities/users/users.model';
import { Session } from 'src/entities/sessions/sessions.model';
import { OtpModule } from 'src/entities/otp/otp.module';
import { Otp } from '../otp/otp.model';
import { OtpService } from '../otp/otp.service';
import { MessagingModule } from 'src/messaging/messaging.module';
import { SmsService } from 'src/messaging/sms.service';
import { AuthModule } from 'src/auth/auth.module';

import { Group } from './groups.model';
import { GroupsService } from './groups.service';

describe('groupsService', () => {
  let groupsService: GroupsService;
  let userService: UsersService;
  let smsService: SmsService;
  let dataSource: DataSource;
  let otpService: OtpService;

  let sentCode: string | undefined;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ envFilePath: '.env.test', isGlobal: true }),
        TypeOrmModule.forRoot({
          type: 'postgres',
          url: env.DATABASE_URL,
          entities: [User, Group, Session, Otp],
          synchronize: true,
          dropSchema: true,
          logging: false,
        }),
        MessagingModule.forRoot({
          sms: {
            verificationTemplate: env.KAVENEGAR_VERIFICATION_TEMPLATE,
            apiKey: env.KAVENEGAR_API_KEY,
          },
        }),
        AuthModule.forRoot({
          accessTokenSecret: env.ACCESS_TOKEN_SECRET,
          refreshTokenSecret: env.REFRESH_TOKEN_SECRET,
          accessTokenExpiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
          refreshTokenExpiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
        }),
        UsersModule,
        OtpModule,
      ],
      providers: [GroupsService, UsersService],
    }).compile();

    groupsService = module.get<GroupsService>(GroupsService);
    userService = module.get<UsersService>(UsersService);
    smsService = module.get<SmsService>(SmsService);
    dataSource = module.get<DataSource>(DataSource);
    otpService = module.get<OtpService>(OtpService);

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
    expect(dataSource).toBeDefined();
    expect(otpService).toBeDefined();
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

      const registerUserResult = await userService.registerUser({
        verifyOtpInput: { code: sentCode, phoneNumber: '09013792332' },
        createUserInput: {
          name: userName,
          tags: ['testTag1', 'testTag2'],
        },
      });

      expect(registerUserResult.tokens).toBeDefined();
      expect(typeof registerUserResult.tokens.accessToken).toBe('string');
      expect(typeof registerUserResult.tokens.refreshToken).toBe('string');
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
