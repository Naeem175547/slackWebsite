import { Module } from '@nestjs/common';
import { MailService } from './mail.service.js';
import { MailController } from './mail.controller.js';

@Module({
  providers: [MailService],
  controllers: [MailController],
})
export class MailModule {}
