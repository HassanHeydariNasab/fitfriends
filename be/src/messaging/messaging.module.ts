import { DynamicModule, Module } from '@nestjs/common';

import { SmsService } from './sms.service';
import { SMS_OPTIONS } from './sms.options';
import type { MessagingOptions } from './messaging.options';

@Module({})
export class MessagingModule {
  static forRoot(options: MessagingOptions): DynamicModule {
    return {
      module: MessagingModule,
      providers: [{ provide: SMS_OPTIONS, useValue: options.sms }, SmsService],
      exports: [SmsService],
    };
  }
}
