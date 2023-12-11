import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Family, FamilyMember, User } from '../../infra/entities';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { PassportModule } from '@nestjs/passport';
import { JwtServiceAuthGuard } from '../../auth/guards/jwt-service-auth.guard';
import { MockJwtAuthGuard } from './mockAuthGuard';
import { ChatService } from '../../domain/chat/chat.service';
import { ChatMessage } from '../../infra/entities/message.entity';
import { ChatModule } from '../../module/chat.module';

describe('ChatController (e2e)', () => {
  let app: INestApplication;
  let mockChatService: Partial<ChatService>;
  let mockChatRepository: Partial<Repository<ChatMessage>>;
  let mockFamilyMemberRepository: Partial<Repository<FamilyMember>>;
  const user: User = User.createUser(
    'test',
    'test',
    'test',
    'testNickname',
    1,
    1,
  );
  const family: Family = Family.createFamily('test', 'test');
  const familyMember: FamilyMember = FamilyMember.createFamilyMember(
    1,
    family,
    user,
    null,
    null,
  );
  const chat: ChatMessage = ChatMessage.createMessage(
    'testContent',
    new Date(11, 11, 11, 11, 11, 11),
    familyMember,
    Family.createFamily('test', 'test'),
  );

  beforeEach(async () => {
    mockChatService = {
      saveChat: jest.fn().mockResolvedValue(1),
      findAllChat: jest.fn().mockResolvedValue([
        {
          createdTime: chat.createdDate
            .toLocaleTimeString('ko-KR', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false,
            })
            .slice(0, 5),
          nickname: chat.familyMember.user.nickname,
          role: 1,
          message: chat.content,
        },
      ]),
      deleteAllChat: jest.fn(),
    };
    mockChatRepository = {
      findOne: jest.fn().mockResolvedValue(chat),
      find: jest.fn().mockResolvedValue([chat]),
    };
    mockFamilyMemberRepository = {
      findOne: jest.fn().mockResolvedValue(familyMember),
      find: jest.fn().mockResolvedValue([familyMember]),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ChatModule,
        PassportModule.register({ defaultStrategy: 'jwt-service' }),
      ],
    })
      .overrideProvider(ChatService)
      .useValue(mockChatService)
      .overrideProvider(getRepositoryToken(ChatMessage))
      .useValue(mockChatRepository)
      .overrideProvider(getRepositoryToken(FamilyMember))
      .useValue(mockFamilyMemberRepository)
      .overrideGuard(JwtServiceAuthGuard)
      .useClass(MockJwtAuthGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('should delete all chat', async () => {
    const response = await request(app.getHttpServer())
      .delete('/api/chat')
      .query('familyId=1');
    expect(response.body.message).toBe('채팅 삭제 성공');
  });

  it('should find chat list by family id', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/chat')
      .query('familyId=1');

    expect(response.body.message).toBe('채팅 조회 성공');
    expect(response.body.data[0].nickname).toBe('testNickname');
    expect(response.body.data[0].role).toBe(1);
    expect(response.body.data[0].message).toBe('testContent');
    expect(response.body.data[0].createdTime).toBe('11:11');
  });
});
