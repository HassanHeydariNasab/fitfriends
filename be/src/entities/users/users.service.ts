import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { SmsService } from 'src/messaging/sms.service';
import { AuthService } from 'src/auth/auth.service';
import { OtpService } from 'src/entities/otp/otp.service';

import { User } from './users.model';
import {
  CreateUserInput,
  RegisterResponse,
  RegisterUserInput,
  RequestOtpInput,
  UpdateUserInput,
  VerifyOtpInput,
  VerifyOtpResponse,
} from './users.dto';

@Injectable({})
export class UsersService {
  constructor(
    private dataSource: DataSource,
    private smsService: SmsService,
    private authService: AuthService,
    private otpService: OtpService,
  ) {}

  async requestOtp({ phoneNumber }: RequestOtpInput): Promise<boolean> {
    const code = await this.otpService.create(phoneNumber);
    return await this.smsService.sendOtp(phoneNumber, code);
  }

  async verifyOtp({
    phoneNumber,
    code,
  }: VerifyOtpInput): Promise<VerifyOtpResponse> {
    if (await this.otpService.isValid(phoneNumber, code)) {
      const user: User | null = await this.dataSource
        .getRepository(User)
        .findOne({ where: { phoneNumber } });
      if (user) {
        await this.otpService.delete(phoneNumber);
        return {
          isRegistered: true,
          tokens: this.authService.generateTokens(user),
        };
      } else {
        await this.otpService.extendExpiration(phoneNumber); // more time for registration
        return { isRegistered: false };
      }
    }
    throw new HttpException('invalid_otp', HttpStatus.CONFLICT);
  }

  private async createUser(
    createUserInput: CreateUserInput & { phoneNumber: string },
  ): Promise<true> {
    try {
      await this.dataSource.getRepository(User).insert(createUserInput);
      return true;
    } catch (error) {
      throw new HttpException(error, HttpStatus.CONFLICT);
    }
  }

  async registerUser({
    verifyOtpInput,
    createUserInput,
  }: RegisterUserInput): Promise<RegisterResponse> {
    await this.verifyOtp(verifyOtpInput);
    await this.otpService.delete(verifyOtpInput.phoneNumber);
    await this.createUser({
      ...createUserInput,
      phoneNumber: verifyOtpInput.phoneNumber,
    });
    const user = await this.dataSource.getRepository(User).findOne({
      where: { phoneNumber: verifyOtpInput.phoneNumber },
    });
    if (user) {
      return Promise.resolve({ tokens: this.authService.generateTokens(user) });
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
