var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JOIN_CHANNEL, LEAVE_CHANNEL, NEW_MESSAGE_EVENT, NEW_MESSAGE_RECEIVED_EVENT, } from './utils/eventConstant.js';
import { MessageService } from '../message/message.service.js';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '../common/guards/websocket.guard.js';
let WebsocketGateway = class WebsocketGateway {
    messageService;
    constructor(messageService) {
        this.messageService = messageService;
    }
    server;
    async handleJoin(socket, data) {
        console.log('JOIN DATA:', data);
        if (!data?.channelId) {
            return {
                message: 'channelId is required',
            };
        }
        const roomId = data.channelId.toString();
        socket.join(roomId);
        console.log(`User ${socket.id} joined channel: ${roomId}`);
        return {
            message: 'You have been added to channel',
            data: {
                roomId,
            },
        };
    }
    async handleLeave(socket, data) {
        console.log('LEAVE DATA:', data);
        if (!data?.channelId) {
            return {
                message: 'channelId is required',
            };
        }
        const roomId = data.channelId.toString();
        socket.leave(roomId);
        console.log(`User ${socket.id} left channel: ${roomId}`);
        return {
            message: 'You have left the channel',
            data: {
                roomId,
            },
        };
    }
    async handleMessage(socket, data) {
        const userId = socket.data.user.id;
        const savedMessage = await this.messageService.createMessageService({
            channelId: data.channelId,
            body: data.body,
        }, userId);
        const roomId = data.channelId.toString();
        this.server.to(roomId).emit(NEW_MESSAGE_RECEIVED_EVENT, savedMessage);
        return {
            message: 'Message sent successfully',
            data: savedMessage,
        };
    }
};
__decorate([
    WebSocketServer(),
    __metadata("design:type", Server)
], WebsocketGateway.prototype, "server", void 0);
__decorate([
    SubscribeMessage(JOIN_CHANNEL),
    __param(0, ConnectedSocket()),
    __param(1, MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Socket, Object]),
    __metadata("design:returntype", Promise)
], WebsocketGateway.prototype, "handleJoin", null);
__decorate([
    SubscribeMessage(LEAVE_CHANNEL),
    __param(0, ConnectedSocket()),
    __param(1, MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Socket, Object]),
    __metadata("design:returntype", Promise)
], WebsocketGateway.prototype, "handleLeave", null);
__decorate([
    SubscribeMessage(NEW_MESSAGE_EVENT),
    __param(0, ConnectedSocket()),
    __param(1, MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Socket, Object]),
    __metadata("design:returntype", Promise)
], WebsocketGateway.prototype, "handleMessage", null);
WebsocketGateway = __decorate([
    WebSocketGateway(),
    UseGuards(WsJwtGuard),
    __metadata("design:paramtypes", [MessageService])
], WebsocketGateway);
export { WebsocketGateway };
//# sourceMappingURL=websocket.gateway.js.map