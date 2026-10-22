var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Global, Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver.js';
import { AuthService } from './auth.service.js';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module.js';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module.js';
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    Global(),
    Module({
        imports: [
            UserModule,
            RabbitmqModule,
            JwtModule.registerAsync({
                inject: [ConfigService],
                useFactory: (configService) => ({
                    secret: configService.getOrThrow('JWT_SECRET'),
                    signOptions: { expiresIn: '1h' },
                }),
            }),
        ],
        providers: [AuthResolver, AuthService],
        exports: [AuthService, JwtModule],
    })
], AuthModule);
export { AuthModule };
//# sourceMappingURL=auth.module.js.map