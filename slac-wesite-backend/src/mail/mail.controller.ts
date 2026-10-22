import { Body, Controller, Get, Post } from '@nestjs/common';
import { MailService } from './mail.service.js';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}
  @EventPattern('sendMail')
  sendMail(@Payload() payload: any) {
    console.log('now mal success fully trigger')    
    return this.mailService.sendMail(payload.to, payload.subject, payload.body);
    
  }
}
