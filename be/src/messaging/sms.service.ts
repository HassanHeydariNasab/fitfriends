import { Inject, Injectable } from '@nestjs/common';
import Kavenegar from 'kavenegar';

import { SMS_OPTIONS } from './sms.options';
import type { SmsOptions } from './sms.options';

@Injectable()
export class SmsService {
  kavenegar: Kavenegar.kavenegar.KavenegarInstance;

  constructor(@Inject(SMS_OPTIONS) private options: SmsOptions) {
    this.kavenegar = Kavenegar.KavenegarApi({ apikey: options.apiKey });
  }

  sendOtp(phoneNumber: string, code: string) {
    return new Promise<boolean>((resolve) => {
      this.kavenegar.VerifyLookup(
        {
          receptor: phoneNumber,
          token: code,
          template: this.options.verificationTemplate,
        },
        (response, status) => {
          console.log(response);
          console.log(status);
          resolve(status === 200);
        },
      );
    });
  }
}
