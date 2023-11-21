import { randomInt } from 'crypto';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { User } from './users.model';
import {
  CreateUserInput,
  RegisterUserInput,
  RequestOtpInput,
  UpdateUserInput,
  VerifyOtpInput,
} from './users.dto';
import { SmsService } from 'src/messaging/sms.service';
import { RedisService } from 'src/redis/redis.service';
import { UsersSecurity } from './users.security';

@Injectable({})
export class UsersService {
  constructor(
    private dataSource: DataSource,
    private smsService: SmsService,
    private redisService: RedisService,
    private usersSecurity: UsersSecurity,
  ) {}

  async requestOtp({ phoneNumber }: RequestOtpInput) {
    const code = randomInt(10000, 99999).toString();
    try {
      await this.redisService.r.set(phoneNumber, code, { EX: 900 });
      return await this.smsService.sendOtp(phoneNumber, code);
    } catch (error) {
      throw new HttpException(
        'sending_otp_failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async verifyOtp({ phoneNumber, code }: VerifyOtpInput): Promise<{
    isRegistered: boolean;
    token?: string;
  }> {
    try {
      const storedCode = await this.redisService.r.get(phoneNumber);
      if (!!storedCode && storedCode === code) {
        const user: User | null = await this.dataSource
          .getRepository(User)
          .findOne({ where: { phoneNumber } });
        if (user) {
          await this.redisService.r.del(phoneNumber);
          return {
            isRegistered: true,
            token: this.usersSecurity.generateToken(user),
          };
        } else {
          await this.redisService.r.expire(phoneNumber, 3600); // more time to register
          return { isRegistered: false };
        }
      }
      throw new HttpException('invalid_otp', HttpStatus.CONFLICT);
    } catch (error) {
      throw new HttpException(
        'verifying_otp_failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error === 'invalid_otp' ? 'invalid_otp' : 'unknown' },
      );
    }
  }

  private async createUser(createUserInput: CreateUserInput): Promise<true> {
    try {
      await this.dataSource.getRepository(User).insert(createUserInput);
      return true;
    } catch (error) {
      throw new HttpException(error, HttpStatus.CONFLICT);
    }
  }

  async registerUser({ verifyOtpInput, createUserInput }: RegisterUserInput) {
    await this.verifyOtp(verifyOtpInput);
    await this.redisService.r.del(verifyOtpInput.phoneNumber);
    await this.createUser({
      ...createUserInput,
      phoneNumber: verifyOtpInput.phoneNumber,
    });
    const user = await this.dataSource.getRepository(User).findOne({
      where: { phoneNumber: verifyOtpInput.phoneNumber },
    });
    if (user) {
      return this.usersSecurity.generateToken(user);
    } else {
      throw new HttpException('user_not_found', HttpStatus.NOT_FOUND);
    }
  }

  async getUser(id: number) {
    try {
      return await this.dataSource.getRepository(User).findOneOrFail({
        where: { id },
        relations: {
          administeredGroups: true,
          joinedGroups: true,
          participatedSessions: true,
        },
      });
    } catch (error) {
      throw new HttpException('user_not_found', HttpStatus.NOT_FOUND);
    }
  }

  async updateUser(id: number, updateUserInput: UpdateUserInput) {
    try {
      if (updateUserInput.phoneNumber) {
        // TODO: verify new phone number
        delete updateUserInput.phoneNumber;
      }
      if (updateUserInput.email) {
        // TODO: verify new email
        delete updateUserInput.email;
      }
      await this.dataSource.getRepository(User).update(id, updateUserInput);
      return true;
    } catch (error) {
      throw new HttpException(error, HttpStatus.CONFLICT);
    }
  }
}
