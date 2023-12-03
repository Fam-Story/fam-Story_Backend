import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from '../../domain/chat/chat.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ChatMessage } from '../../infra/entities/message.entity';
import { FamilyMember } from '../../infra/entities';

describe('ChatService', () => {
  const mockRepository = () => ({
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
  });

  let service: ChatService;
  let chatRepository;

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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
