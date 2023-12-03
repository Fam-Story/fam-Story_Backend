import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { JwtServiceAuthGuard } from '../../auth/guards/jwt-service-auth.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatMessage } from '../../infra/entities/message.entity';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';

@UseGuards(JwtServiceAuthGuard)
@WebSocketGateway({
  cors: true,
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    @InjectRepository(ChatMessage)
    private readonly chatService: ChatService,
  ) {}

  @SubscribeMessage('joinFamily')
  async handleJoinRoom(
    @MessageBody() data: { familyId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const familyId = data.familyId;
    client.join(familyId);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody()
    data: { createChatDto: CreateChatDto },
    @ConnectedSocket() client: Socket,
  ) {
    const createDate = new Date();
    await this.chatService.saveChat(data.createChatDto, createDate);

    // 다른 가족 구성원에게 메시지 전송
    this.server.to(data.createChatDto.familyId).emit('receiveMessage', {
      familyMemberId: data.createChatDto.familyMemberId,
      message: data.createChatDto.message,
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
}
