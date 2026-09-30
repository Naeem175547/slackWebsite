import { Module } from '@nestjs/common';
import { MessageResolver } from './message.resolver.js';
import { MessageService } from './message.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './entity/message.entity.js';
import { MessageRepository } from './message.repository.js';
import { ChannelModule } from '../channel/channel.module.js';
import { UserModule } from '../user/user.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageEntity]),
    ChannelModule,
    UserModule,
  ],
  providers: [MessageResolver, MessageService, MessageRepository],
  exports: [MessageService],
})
export class MessageModule {}
