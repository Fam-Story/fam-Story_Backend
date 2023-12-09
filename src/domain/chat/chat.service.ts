import { Injectable } from '@nestjs/common';
import { ChatMessage } from '../../infra/entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';
import { ResponseChatDto } from './dto/response-chat.dto';
import { FamilyMember } from '../../infra/entities';
import { ResponseCode } from '../../common';
import { FamilyException } from '../../common/exception/family.exception';
import {FamilyMemberException} from "../../common/exception/family-member.exception";

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatMessage)
    private readonly chatRepository: Repository<ChatMessage>,
    @InjectRepository(FamilyMember)
    private readonly familyMemberRepository: Repository<FamilyMember>,
  ) {}
  async saveChat(createChatDto: CreateChatDto, date: string) {
    await this.validateFamilyMember(parseInt(createChatDto.familyMemberId));

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
    await this.validateUser(userId, familyId);

    const chatMessages: ChatMessage[] = await this.chatRepository.find({
      where: { family: { id: familyId } },
      relations: ['familyMember', 'familyMember.user'],
      order: { createdDate: 'ASC' },
    });
    return chatMessages.map((chatMessage) => {
      const responseChatDto = new ResponseChatDto();
      responseChatDto.familyMemberId = chatMessage.familyMember.id.toString();
      responseChatDto.nickname = chatMessage.familyMember.user.nickname;
      responseChatDto.message = chatMessage.content;
      responseChatDto.role = chatMessage.familyMember.role;
      responseChatDto.createdTime = chatMessage.createdDate
        .toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
        .slice(0, 5);
      return responseChatDto;
    });
  }

  async deleteAllChat(userId: number, familyId: number) {
    await this.validateUser(userId, familyId);
    const chatMessages = await this.chatRepository.find({
      where: { family: { id: familyId } },
    });
    await this.chatRepository.remove(chatMessages);
  }

  async validateFamilyMember(familyMemberId: number) {
    const family = await this.familyMemberRepository.findOne({
      where: { id: familyMemberId },
    });
    if (!family) {
      throw new FamilyMemberException(ResponseCode.FAMILY_MEMBER_NOT_FOUND);
    }
  }

  async validateUser(userId: number, familyId: number) {
    const familyMember = await this.familyMemberRepository.findOne({
      where: { user: { id: userId }, family: { id: familyId } },
      relations: ['user', 'family'],
    });
    if (!familyMember) {
      throw new FamilyException(ResponseCode.CHAT_FORBIDDEN);
    }
  }
}
