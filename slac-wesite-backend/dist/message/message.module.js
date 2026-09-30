var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { MessageResolver } from './message.resolver.js';
import { MessageService } from './message.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './entity/message.entity.js';
import { MessageRepository } from './message.repository.js';
import { ChannelModule } from '../channel/channel.module.js';
import { UserModule } from '../user/user.module.js';
let MessageModule = class MessageModule {
};
MessageModule = __decorate([
    Module({
        imports: [
            TypeOrmModule.forFeature([MessageEntity]),
            ChannelModule,
            UserModule,
        ],
        providers: [MessageResolver, MessageService, MessageRepository],
        exports: [MessageService],
    })
], MessageModule);
export { MessageModule };
//# sourceMappingURL=message.module.js.map