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
import { User } from './users/users.model';
import { Group } from './groups/groups.model';
import { Session } from './sessions/sessions.model';
import { UsersModule } from './users/users.module';
import { SessionsModule } from './sessions/sessions.module';

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
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: env.NODE_ENV !== 'prod',
      autoSchemaFile: join(cwd(), 'src/schema.gql'),
    }),
    UsersModule,
    SessionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
