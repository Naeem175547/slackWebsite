import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const socket = context.switchToWs().getClient<Socket>();
    const token = socket.handshake.auth?.token;

    if (!token) {
      throw new WsException('Authentication token is required');
    }

    try {
      const payload = this.jwtService.verify(token);

      // Store authenticated user on socket
      socket.data.user = {
        id: payload.sub,
        email: payload.email,
      };

      return true;
    } catch (error) {
      throw new WsException('Invalid or expired token');
    }
  }
}
