import { DynamicModule, Module } from '@nestjs/common';

import { RedisService } from './redis.service';

@Module({})
export class RedisModule {
  static forRoot(options: Record<string, any>): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        { provide: 'REDIS_CLIENT_OPTIONS', useValue: options },
        RedisService,
      ],
      exports: [RedisService],
    };
  }
}
