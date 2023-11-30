import { Module } from '@nestjs/common';
import { ChatService } from '../chat/chat.service';
import { ChatGateway } from '../chat/chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessage } from '../infra/entities/message.entity';
import { FamilyMember } from '../infra/entities';
import { ChatController } from '../chat/chat.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessage, FamilyMember])],
  providers: [ChatGateway, ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
