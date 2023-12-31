import { env } from 'process';

import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { Group } from '../groups/groups.model';
import { Session } from '../sessions/sessions.model';
import { OtpModule } from '../otp/otp.module';
import { OtpService } from '../otp/otp.service';
import { Otp } from '../otp/otp.model';
import { Login } from '../logins/logins.model';
import { MessagingModule } from 'src/messaging/messaging.module';
import { SmsService } from 'src/messaging/sms.service';
import { AuthModule } from 'src/auth/auth.module';

import { User } from './users.model';
import { UsersService } from './users.service';

describe('usersService', () => {
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
          entities: [User, Group, Session, Otp, Login],
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
        OtpModule,
      ],
      providers: [UsersService],
    }).compile();

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
    expect(userService).toBeDefined();
    expect(smsService).toBeDefined();
    expect(dataSource).toBeDefined();
    expect(otpService).toBeDefined();
  });

  describe('register a new user and login the existing user', () => {
    const userName = 'testUser1';
    const phoneNumber = '09013792332';
    let userId = null;

    it('should request OTP', async () => {
      const result = await userService.requestOtp({
        phoneNumber,
      });
      expect(result).toBe(true);
      expect(sentCode).toHaveLength(5);
    });

    it('should verify OTP and register a new user', async () => {
      const verifyOtpResult = await userService.verifyOtp({
        phoneNumber,
        code: sentCode,
      });

      expect(verifyOtpResult).toEqual({ isRegistered: false });

      const registerUserResult = await userService.registerUser({
        verifyOtpInput: { code: sentCode, phoneNumber },
        createUserInput: {
          name: userName,
          tags: ['testTag1', 'testTag2'],
        },
      });

      expect(registerUserResult.tokens).toBeDefined();
      expect(typeof registerUserResult.tokens.accessToken).toBe('string');
      expect(typeof registerUserResult.tokens.refreshToken).toBe('string');

      const users = await dataSource.getRepository(User).find({
        where: { phoneNumber },
      });

      expect(users).toHaveLength(1);

      const user = users[0];
      userId = user.id;

      expect(user).toBeDefined();
      expect(user?.name).toBe(userName);
    });

    it('should get the user', async () => {
      const user = await userService.getUser(userId);
      expect(user).toBeDefined();
      expect(user?.name).toBe(userName);
    });

    it('should login/logout the existing user', async () => {
      const result = await userService.requestOtp({
        phoneNumber,
      });

      expect(result).toBe(true);
      expect(sentCode).toHaveLength(5);

      const verifyOtpResult = await userService.verifyOtp({
        phoneNumber,
        code: sentCode,
      });

      expect(verifyOtpResult.isRegistered).toBe(true);
      expect(verifyOtpResult.tokens).toBeDefined();
      expect(typeof verifyOtpResult.tokens.accessToken).toBe('string');
      expect(typeof verifyOtpResult.tokens.refreshToken).toBe('string');

      const users = await dataSource.getRepository(User).find({
        where: { phoneNumber },
      });

      expect(users).toHaveLength(1);

      const user = users[0];

      expect(user).toBeDefined();
      expect(user?.name).toBe(userName);

      const { tokens } = verifyOtpResult;

      const newTokens = await userService.refreshTokens(tokens.refreshToken);

      expect(newTokens).toBeDefined();
      expect(typeof newTokens.accessToken).toBe('string');
      expect(typeof newTokens.refreshToken).toBe('string');

      // Another login
      await userService.requestOtp({
        phoneNumber,
      });
      await userService.verifyOtp({
        phoneNumber,
        code: sentCode,
      });

      const logins1 = await dataSource
        .getRepository<Login>(Login)
        .find({ where: { userId: user.id } });

      expect(logins1).toHaveLength(3);

      const logoutResult = await userService.logout(newTokens.refreshToken);
      expect(logoutResult).toBe(true);

      const logins2 = await dataSource
        .getRepository<Login>(Login)
        .find({ where: { userId: user.id } });

      expect(logins2).toHaveLength(2);

      await expect(
        userService.refreshTokens(newTokens.refreshToken),
      ).rejects.toThrow();
    });

    it('should not refresh the tokens', async () => {
      await expect(
        userService.refreshTokens('InVaLid_ToKeN'),
      ).rejects.toThrow();
    });
  });
});
