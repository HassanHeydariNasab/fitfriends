import { Inject, Injectable } from '@nestjs/common';
import { KavenegarApi, kavenegar } from 'kavenegar';

import { SMS_OPTIONS } from './sms.options';
import type { SmsOptions } from './sms.options';

@Injectable()
export class SmsService {
  kavenegar: kavenegar.KavenegarInstance;

  constructor(@Inject(SMS_OPTIONS) private options: SmsOptions) {
    this.kavenegar = KavenegarApi({ apikey: options.apiKey });
  }

  sendOtp(phoneNumber: string, code: string) {
    if (this.options.dryRun) {
      console.log(
        `Dry run: SMS OTP code ${code} sent to ${phoneNumber} successfully.`,
      );
      return Promise.resolve(true);
    }
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
