import { ClientProxy } from '@nestjs/microservices';
export declare class RabbitMqProducer {
    private rabbitmq;
    constructor(rabbitmq: ClientProxy);
    sendMail(to: string, subject: string, body: string): void;
}
