import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { SmsService } from 'src/messaging/sms.service';
import { AuthService } from 'src/auth/auth.service';
import { OtpService } from 'src/entities/otp/otp.service';

import { User } from './users.model';
import {
  CreateUserInput,
  LogoutInput,
  RefreshTokenInput,
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
        const { tokens } = await this.authService.login(user.id);
        return {
          isRegistered: true,
          tokens,
        };
      } else {
        await this.otpService.extendExpiration(phoneNumber); // more time for registration
        return { isRegistered: false };
      }
    }
    throw new HttpException('invalid_otp', HttpStatus.CONFLICT);
  }

  /** Don't expose this method to the user. Use registerUser instead. */
  async createUser(
    createUserInput: CreateUserInput & { phoneNumber: string },
  ): Promise<number> {
    try {
      const insertResult = await this.dataSource
        .getRepository(User)
        .insert(createUserInput);
      return insertResult.identifiers[0].id;
    } catch (error) {
      throw new HttpException(error, HttpStatus.CONFLICT);
    }
  }

  async registerUser({
    verifyOtpInput,
    createUserInput,
  }: RegisterUserInput): Promise<RegisterResponse> {
    if (
      !(await this.otpService.isValid(
        verifyOtpInput.phoneNumber,
        verifyOtpInput.code,
      ))
    ) {
      throw new HttpException('invalid_otp', HttpStatus.CONFLICT);
    }
    await this.otpService.delete(verifyOtpInput.phoneNumber);
    await this.createUser({
      ...createUserInput,
      phoneNumber: verifyOtpInput.phoneNumber,
    });
    const user = await this.dataSource.getRepository(User).findOne({
      where: { phoneNumber: verifyOtpInput.phoneNumber },
    });
    if (user) {
      const { tokens } = await this.authService.login(user.id);
      return { tokens };
    } else {
      throw new HttpException('user_not_found', HttpStatus.NOT_FOUND);
    }
  }

  refreshTokens({ refreshToken }: RefreshTokenInput) {
    return this.authService.refreshTokens(refreshToken);
  }

  logout({ refreshToken }: LogoutInput) {
    return this.authService.logout(refreshToken);
  }

  async getUser(userId: number) {
    try {
      return await this.dataSource.getRepository(User).findOneOrFail({
        where: { id: userId },
        select: {
          name: true,
          avatarUrl: true,
          bio: true,
          tags: true,
        },
      });
    } catch (error) {
      throw new HttpException('user_not_found', HttpStatus.NOT_FOUND);
    }
  }

  async getMe(userId: number) {
    try {
      return await this.dataSource.getRepository(User).findOneOrFail({
        where: { id: userId },
        select: {
          name: true,
          avatarUrl: true,
          bio: true,
          tags: true,
          administeredGroups: { id: true, name: true, coverUrl: true },
          joinedGroups: { id: true, name: true, coverUrl: true },
          participatedSessions: { id: true },
          logins: {
            id: true,
            updatedAt: true,
          },
        },
        relations: {
          administeredGroups: true,
          joinedGroups: true,
          participatedSessions: true,
          logins: true,
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
