import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitMqProducer {
  constructor(@Inject('RABBITMQ_SERVICE') private rabbitmq: ClientProxy) {}

  sendMail(to: string, subject: string, body: string) {
    this.rabbitmq.emit('sendMail', {
      to,
      subject,
      body,
    });
  }
}
