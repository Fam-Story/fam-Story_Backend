import { Injectable } from '@nestjs/common';
import { ChatMessage } from '../infra/entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatMessage)
    private readonly chatRepository: Repository<ChatMessage>,
  ) {}
  async saveChat(createChatDto: CreateChatDto, date: Date) {
    const parsedFamilyId: number = parseInt(createChatDto.familyId);
    const parsedFamilyMemberId: number = parseInt(createChatDto.familyMemberId);

    const messageInstance = this.chatRepository.create({
      familyMember: { id: parsedFamilyMemberId },
      family: { id: parsedFamilyId },
      content: createChatDto.message,
      createdDate: date,
    });
    await this.chatRepository.save(messageInstance);
  }

  findAllChat(familyId: number) {
    return this.chatRepository.find({
      where: { family: { id: familyId } },
      relations: ['familyMember'],
      order: { createdDate: 'ASC' },
    });
  }

  async deleteAllChat(familyId: number) {
    const chatMessages = await this.chatRepository.find({
      where: { family: { id: familyId } },
    });
    await this.chatRepository.remove(chatMessages);
  }
}
