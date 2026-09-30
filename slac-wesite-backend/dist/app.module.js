var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './config/dbConfig.js';
import { UserModule } from './user/user.module.js';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module.js';
import { MessageModule } from './message/message.module.js';
import { ChannelModule } from './channel/channel.module.js';
import { WorkspaceModule } from './workspace/workspace.module.js';
import { MailModule } from './mail/mail.module.js';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module.js';
import { MemberModule } from './member/member.module.js';
import { WebsocketGateway } from './websocket/websocket.gateway.js';
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
        imports: [
            ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            GraphQLModule.forRoot({
                driver: ApolloDriver,
                autoSchemaFile: 'schema.gql',
                context: ({ req, res }) => ({
                    req,
                    res,
                }),
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
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map