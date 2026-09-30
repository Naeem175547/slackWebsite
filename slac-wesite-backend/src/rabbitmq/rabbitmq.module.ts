import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { RabbitMqProducer } from './rabbitmq.producer.js';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'app_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],

  providers: [RabbitMqProducer],
  exports: [RabbitMqProducer],
})
export class RabbitmqModule {}
