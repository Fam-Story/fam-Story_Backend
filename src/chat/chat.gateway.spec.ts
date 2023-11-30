import { Test, TestingModule } from '@nestjs/testing';
import { ChatGateway } from './chat.gateway';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ChatMessage } from '../infra/entities/message.entity';

describe('ChatGateway', () => {
  let gateway: ChatGateway;
  let mockMessageRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatGateway,
        {
          provide: getRepositoryToken(ChatMessage),
          useValue: mockMessageRepository,
        },
      ],
    }).compile();

    gateway = module.get<ChatGateway>(ChatGateway);
    mockMessageRepository = module.get(getRepositoryToken(ChatMessage));
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
