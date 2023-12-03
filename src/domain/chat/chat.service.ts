import { Injectable } from '@nestjs/common';
import { ChatMessage } from '../../infra/entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';
import { ResponseChatDto } from './dto/response-chat.dto';
import { FamilyMember } from '../../infra/entities';
import { ResponseCode } from '../../common';
import { FamilyException } from '../../common/exception/family.exception';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatMessage)
    private readonly chatRepository: Repository<ChatMessage>,
    @InjectRepository(FamilyMember)
    private readonly familyMemberRepository: Repository<FamilyMember>,
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

  async findAllChat(
    userId: number,
    familyId: number,
  ): Promise<ResponseChatDto[]> {
    //해당 유저가 이 가족에 속해있는지 확인
    const familyMember = await this.familyMemberRepository.findOne({
      where: { user: { id: userId }, family: { id: familyId } },
    });
    if (!familyMember) {
      throw new FamilyException(ResponseCode.FAMILY_FORBIDDEN);
    }

    const chatMessages: ChatMessage[] = await this.chatRepository.find({
      where: { family: { id: familyId } },
      relations: ['familyMember', 'user'],
      order: { createdDate: 'ASC' },
    });
    return chatMessages.map((chatMessage) => {
      const responseChatDto = new ResponseChatDto();
      responseChatDto.familyMemberName = chatMessage.familyMember.user.username;
      responseChatDto.message = chatMessage.content;
      responseChatDto.role = chatMessage.familyMember.role;
      return responseChatDto;
    });
  }

  async deleteAllChat(familyId: number) {
    const chatMessages = await this.chatRepository.find({
      where: { family: { id: familyId } },
    });
    await this.chatRepository.remove(chatMessages);
  }
}
