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
import { InjectRepository } from '@nestjs/typeorm';
import { ChatMessage } from '../infra/entities/message.entity';
import { Repository } from 'typeorm';

@UseGuards(JwtServiceAuthGuard)
@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    @InjectRepository(ChatMessage)
    private readonly messageRepository: Repository<ChatMessage>,
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
    data: { familyId: string; familyMemberId: string; message: string },
    @ConnectedSocket() client: Socket,
  ) {
    const date = new Date();
    const parsedFamilyId: number = parseInt(data.familyId);
    const parsedFamilyMemberId: number = parseInt(data.familyMemberId);

    const message = this.messageRepository.create({
      familyMember: { id: parsedFamilyMemberId },
      family: { id: parsedFamilyId },
      content: data.message,
      createdDate: date,
    });
    await this.messageRepository.save(message);

    // 다른 가족 구성원에게 메시지 전송
    this.server.to(data.familyId).emit('receiveMessage', {
      familyMemberId: data.familyMemberId,
      message: data.message,
      createdAt: message.createdDate, // 메시지가 저장된 시간
    });
  }
}
