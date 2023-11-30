import { Module } from '@nestjs/common';
import { ChatService } from '../domain/chat/chat.service';
import { ChatGateway } from '../domain/chat/chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessage } from '../infra/entities/message.entity';
import { FamilyMember } from '../infra/entities';
import { ChatController } from '../domain/chat/chat.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessage, FamilyMember])],
  providers: [ChatGateway, ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
