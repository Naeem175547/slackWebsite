import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common/pipes/index.js';
import { ResponseInterceptor } from './common/interceptors/interceptors.interceptor.js';
import { Transport } from '@nestjs/microservices';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        transform: true,
    }));
    app.useGlobalInterceptors(new ResponseInterceptor());
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: '*',
    });
    app.connectMicroservice({
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://localhost:5672'],
            queue: 'app_queue',
            queueOptions: {
                durable: true,
            },
        },
    });
    await app.startAllMicroservices();
    await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
//# sourceMappingURL=main.js.map