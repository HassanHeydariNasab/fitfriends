import { randomInt } from 'crypto';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Otp } from './otp.model';

@Injectable({})
export class OtpService {
  constructor(private dataSource: DataSource) {}

  async create(phoneNumber: string): Promise<string> {
    try {
      const code = randomInt(10000, 99999).toString();
      await this.dataSource.getRepository(Otp).upsert(
        {
          phoneNumber,
          code,
          expiresAt: new Date(Date.now() + 300000),
        },
        ['phoneNumber'],
      );
      return code;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'could_not_create_otp',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async isValid(phoneNumber: string, code: string): Promise<boolean> {
    try {
      const otp: Otp | undefined = await this.dataSource
        .getRepository(Otp)
        .findOne({ where: { phoneNumber, code } });
      return otp.code === code;
    } catch (error) {
      throw new HttpException(
        'could_not_verify_otp',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(phoneNumber: string): Promise<void> {
    try {
      await this.dataSource.getRepository(Otp).delete({ phoneNumber });
    } catch (error) {
      throw new HttpException(
        'could_not_delete_otp',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async extendExpiration(phoneNumber: string): Promise<void> {
    try {
      await this.dataSource
        .getRepository(Otp)
        .update({ phoneNumber }, { expiresAt: new Date(Date.now() + 3600000) });
    } catch (error) {
      throw new HttpException(
        'could_not_update_otp_expiration',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
