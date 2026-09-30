var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMqProducer } from './rabbitmq.producer.js';
let RabbitmqModule = class RabbitmqModule {
};
RabbitmqModule = __decorate([
    Module({
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
], RabbitmqModule);
export { RabbitmqModule };
//# sourceMappingURL=rabbitmq.module.js.map