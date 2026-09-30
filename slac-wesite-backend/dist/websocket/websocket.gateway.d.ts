import { Server, Socket } from 'socket.io';
import { MessageService } from '../message/message.service.js';
export declare class WebsocketGateway {
    private readonly messageService;
    constructor(messageService: MessageService);
    server: Server;
    handleJoin(socket: Socket, data: {
        channelId: number;
    }): Promise<{
        message: string;
        data?: undefined;
    } | {
        message: string;
        data: {
            roomId: string;
        };
    }>;
    handleLeave(socket: Socket, data: {
        channelId: number;
    }): Promise<{
        message: string;
        data?: undefined;
    } | {
        message: string;
        data: {
            roomId: string;
        };
    }>;
    handleMessage(socket: Socket, data: {
        channelId: number;
        body: string;
    }): Promise<{
        message: string;
        data: import("../message/entity/message.entity.js").MessageEntity;
    }>;
}
