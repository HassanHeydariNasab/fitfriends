import { join } from 'path';
import { env, cwd } from 'process';

import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
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
import { OtpModule } from './entities/otp/otp.module';
import { UsersModule } from './entities/users/users.module';
import { GroupsModule } from './entities/groups/groups.module';
import { SessionsModule } from './entities/sessions/sessions.module';
import { Otp } from './entities/otp/otp.model';
import { MessagingModule } from './messaging/messaging.module';
import { AuthModule } from './auth/auth.module';
import { GqlAuthGuard } from './auth/gql-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: env.DATABASE_URL,
      entities: [User, Group, Session, Otp],
      synchronize: false,
      logging: true,
    }),
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
    AuthModule.forRoot({
      accessTokenSecret: env.ACCESS_TOKEN_SECRET,
      accessTokenExpiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
      refreshTokenSecret: env.REFRESH_TOKEN_SECRET,
      refreshTokenExpiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
    }),
    UsersModule,
    GroupsModule,
    SessionsModule,
    OtpModule,
  ],

  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: GqlAuthGuard }],
})
export class AppModule {}
