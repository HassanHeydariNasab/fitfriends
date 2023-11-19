import { join } from 'path';
import { env, cwd } from 'process';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import type { ApolloDriverConfig } from '@nestjs/apollo';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/users/users.model';
import { Group } from './entities/groups/groups.model';
import { Session } from './entities/sessions/sessions.model';
import { UsersModule } from './entities/users/users.module';
import { SessionsModule } from './entities/sessions/sessions.module';
import { RedisModule } from './redis/redis.module';
import { MessagingModule } from './messaging/messaging.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: env.DATABASE_URL,
      entities: [User, Group, Session],
      synchronize: false,
      logging: true,
    }),
    RedisModule.forRoot({ url: env.REDIS_URL }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: env.NODE_ENV !== 'prod',
      autoSchemaFile: join(cwd(), 'src/schema.gql'),
    }),
    MessagingModule.forRoot({
      sms: {
        verificationTemplate: env.KAVENEGAR_VERIFICATION_TEMPLATE,
        apiKey: env.KAVENEGAR_API_KEY,
      },
    }),
    UsersModule.forRoot({ security: { JWT_SECRET: env.JWT_SECRET } }),
    SessionsModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
