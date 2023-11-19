import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { RedisClientType, createClient } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  r: RedisClientType<any, any, any>;

  constructor(
    @Inject('REDIS_CLIENT_OPTIONS') private options: Record<string, any>,
  ) {
    this.connect(this.options);
  }

  private async connect(options: Record<string, any>) {
    this.r = await createClient(options).connect();
    this.r.on('error', (error) => {
      console.log('Redis client connection error:', error);
    });
  }

  async onModuleInit() {}

  async onModuleDestroy() {
    await this.r.disconnect();
  }
}
