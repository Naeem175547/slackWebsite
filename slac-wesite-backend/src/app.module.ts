import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/dbConfig.js';
import { UserModule } from './user/user.module.js';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import type { Request, Response } from 'express';
import { AuthModule } from './auth/auth.module.js';
import { MessageModule } from './message/message.module.js';
import { ChannelModule } from './channel/channel.module.js';
import { WorkspaceModule } from './workspace/workspace.module.js';
import { MailModule } from './mail/mail.module.js';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module.js';
import { MemberModule } from './member/member.module.js';
import { WebsocketGateway } from './websocket/websocket.gateway.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      context: ({ req, res }: { req: Request; res: Response }) => ({
        req,
        res,
      }),
      //     formatError: (error) => {
      //   return {
      //     message: error.message,
      //     code: error.extensions?.code,
      //     statusCode: error.extensions?.statusCode,
      //     orginalError: error.extensions?.originalError,
      //     path: error.path,
      //   };
      // },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: dbConfig,
    }),
    UserModule,
    AuthModule,
    MessageModule,
    ChannelModule,
    WorkspaceModule,
    MailModule,
    RabbitmqModule,
    MemberModule,
  ],

  controllers: [AppController],
  providers: [AppService, WebsocketGateway],
})
export class AppModule {}
