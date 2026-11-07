import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

import {
  JOIN_CHANNEL,
  LEAVE_CHANNEL,
  NEW_MESSAGE_EVENT,
  NEW_MESSAGE_RECEIVED_EVENT,
} from './utils/eventConstant.js';

import { MessageService } from '../message/message.service.js';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from '../common/guards/websocket.guard.js';

@WebSocketGateway({ cors: { origin: 'http://localhost:5173' } })
@UseGuards(WsJwtGuard)
export class WebsocketGateway {
  constructor(private readonly messageService: MessageService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage(JOIN_CHANNEL)
  async handleJoin(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: { channelId: number },
  ) {

    if (!data?.channelId) {
      return {
        message: 'channelId is required',
      };
    }

    const roomId = data.channelId.toString();
    socket.join(roomId);
    console.log("user successfully joined")


    return {
      message: 'You have been added to channel',
      data: {
        roomId,
      },
    };
  }

  // =========================
  // LEAVE CHANNEL
  // =========================
  @SubscribeMessage(LEAVE_CHANNEL)
  async handleLeave(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: { channelId: number },
  ) {

    if (!data?.channelId) {
      return {
        message: 'channelId is required',
      };
    }

    const roomId = data.channelId.toString();
    socket.leave(roomId);

    return {
      message: 'You have left the channel',
      data: {
        roomId,
      },
    };
  }

  @SubscribeMessage(NEW_MESSAGE_EVENT)
  async handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody()
    data: {
      channelId: number;
      body: string;
    },
  ) {
    const userId = socket.data.user.id;

    const savedMessage = await this.messageService.createMessageService(
      {
        channelId: data.channelId,
        body: data.body,
      },
      userId,
    );

    const roomId = data.channelId.toString();
    // console.log('saved Message',savedMessage)

   const message = {
      id: savedMessage.id,
      body: savedMessage.body,
      image: savedMessage.image,
      channelId: savedMessage.channel.id,
      createdAt: savedMessage.createdAt,
      user: {
        id: savedMessage.user.id,
        name: savedMessage.user.name,
        username: savedMessage.user.username,
        avatar: savedMessage.user.avatar,
      },
    };
    console.log(message)

    this.server.to(roomId).emit(NEW_MESSAGE_RECEIVED_EVENT, message);

    return {
      message: 'Message sent successfully',
      data: message,
    };
  }
}
