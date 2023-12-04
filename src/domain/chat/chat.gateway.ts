import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer, OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { JwtServiceAuthGuard } from '../../auth/guards/jwt-service-auth.guard';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';

@WebSocketGateway({
  namespace: 'chat',
  cors: true,
})
export class ChatGateway implements OnGatewayConnection{
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('joinFamily')
  async handleJoinRoom(
    @MessageBody() data: { familyId: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(data.familyId);
    const familyId = data.familyId;
    client.join(familyId);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() createChatDto: CreateChatDto,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(createChatDto);
    const createDate = new Date();
    await this.chatService.saveChat(createChatDto, createDate);

    // 다른 가족 구성원에게 메시지 전송
    this.server.to(createChatDto.familyId).emit('receiveMessage', {
      familyMemberId: createChatDto.familyMemberId,
      message: createChatDto.message,
      createdAt: createDate, // 메시지가 저장된 시간
    });
  }

  @SubscribeMessage('leaveFamily')
  async handleLeaveRoom(
    @MessageBody() data: { familyId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const familyId = data.familyId;
    client.leave(familyId);
  }

  handleConnection(@ConnectedSocket() socket: Socket): any {
    console.log(`${socket.id} socket connected`);
  }
}
