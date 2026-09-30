var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
let WsJwtGuard = class WsJwtGuard {
    jwtService;
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    canActivate(context) {
        const socket = context.switchToWs().getClient();
        const token = socket.handshake.auth?.token;
        if (!token) {
            throw new WsException('Authentication token is required');
        }
        try {
            const payload = this.jwtService.verify(token);
            socket.data.user = {
                id: payload.sub,
                email: payload.email,
            };
            return true;
        }
        catch (error) {
            throw new WsException('Invalid or expired token');
        }
    }
};
WsJwtGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [JwtService])
], WsJwtGuard);
export { WsJwtGuard };
//# sourceMappingURL=websocket.guard.js.map