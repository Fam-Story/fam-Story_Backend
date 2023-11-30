import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { JwtServiceAuthGuard } from '../auth/guards/jwt-service-auth.guard';

@UseGuards(JwtServiceAuthGuard)
@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('joinFamily')
  async handleJoinRoom(
    @MessageBody() data: { familyId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const familyId = data.familyId;
    client.join(familyId);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(
    @MessageBody() data: { familyId: string; message: string },
    @ConnectedSocket() client: Socket,
  ) {
    // 메시지를 해당 가족방에 전달
    this.server.to(data.familyId).emit('receiveMessage', data.message);
  }
}
