import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from '../../domain/chat/chat.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ChatMessage } from '../../infra/entities/message.entity';
import { Family, FamilyMember, User } from '../../infra/entities';

describe('ChatService', () => {
  const mockRepository = () => ({
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
    findOne: jest.fn(),
  });

  let service: ChatService;
  let chatRepository;
  let familyMemberRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        {
          provide: getRepositoryToken(ChatMessage),
          useFactory: mockRepository,
        },
        {
          provide: getRepositoryToken(FamilyMember),
          useFactory: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ChatService>(ChatService);
    chatRepository = module.get(getRepositoryToken(ChatMessage));
    familyMemberRepository = module.get(getRepositoryToken(FamilyMember));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save chat', async () => {
    const createChatDto = {
      familyId: '1',
      familyMemberId: '1',
      message: 'hello',
      role: '1',
    };
    const family = Family.createFamily('test', 'test');
    const familyMember = FamilyMember.createFamilyMember(1, family, null, null);

    const date = new Date();
    const dateString = date
      .toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
      .slice(0, 5);
    jest
      .spyOn(chatRepository, 'create')
      .mockResolvedValue(
        ChatMessage.createMessage(
          createChatDto.message,
          date,
          familyMember,
          family,
        ),
      );
    jest
      .spyOn(familyMemberRepository, 'findOne')
      .mockResolvedValue(familyMember);
    jest.spyOn(chatRepository, 'save').mockResolvedValue(createChatDto);
    await service.saveChat(createChatDto, dateString);
    expect(chatRepository.save).toHaveBeenCalled();
  });

  it('should find all chat', async () => {
    const userId = 1;
    const user = User.createUser('test', 'test', 'test', 'testNickname', 1, 1);
    const family = Family.createFamily('test', 'test');
    const familyMember = FamilyMember.createFamilyMember(1, family, user, null);
    const chatMessage = ChatMessage.createMessage(
      'hello',
      new Date(11, 11, 11, 11, 11, 11),
      familyMember,
      family,
    );
    family.id = 1;
    familyMember.id = 2;
    user.id = 3;

    jest.spyOn(chatRepository, 'find').mockResolvedValue([chatMessage]);
    jest
      .spyOn(familyMemberRepository, 'findOne')
      .mockResolvedValue(familyMember);
    const chat = await service.findAllChat(userId, family.id);
    expect(chat).toEqual([
      {
        createdTime: '11:11',
        familyMemberId: '2',
        nickname: 'testNickname',
        role: 1,
        message: 'hello',
      },
    ]);
  });
});
