import { Test, TestingModule } from '@nestjs/testing';
import { InteractionService } from '../../domain/interaction';
import { INestApplication } from '@nestjs/common';
import { FamilyMember, Interaction } from '../../infra/entities';
import { Repository } from 'typeorm';
import { InteractionModule } from '../../module';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { ResponseInteractionDto } from '../../domain/interaction/dto/response-interaction.dto';
import { JwtServiceAuthGuard } from '../../auth/guards/jwt-service-auth.guard';
import { MockJwtAuthGuard } from './mockAuthGuard';
import { PassportModule } from '@nestjs/passport';

describe('InteractionController', () => {
  let app: INestApplication;
  let mockInteractionService: Partial<InteractionService>;
  let mockInteractionRepository: Partial<Repository<Interaction>>;
  let mockFamilyMemberRepository: Partial<Repository<FamilyMember>>;

  const mockJwtServiceStrategy = {
    validate: jest.fn().mockResolvedValue({ id: 1, username: 'testuser' }),
  };

  const interaction = Interaction.createInteraction(
    1,
    FamilyMember.createFamilyMember(1, null, null),
    3,
  );
  interaction.id = 1;

  beforeEach(async () => {
    mockInteractionService = {
      createInteraction: jest.fn().mockResolvedValue(1),
      findAllInteractions: jest
        .fn()
        .mockResolvedValue([ResponseInteractionDto.from(interaction)]),
      checkAllInteractions: jest.fn(),
      deleteAllInteractions: jest.fn(),
    };

    mockInteractionRepository = {
      findOne: jest.fn(),
      find: jest.fn(),
    };

    mockFamilyMemberRepository = {
      findOne: jest.fn(),
      find: jest.fn(),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        InteractionModule,
        PassportModule.register({ defaultStrategy: 'jwt-service' }),
      ],
    })
      .overrideProvider(InteractionService)
      .useValue(mockInteractionService)
      .overrideProvider(getRepositoryToken(Interaction))
      .useValue(mockInteractionRepository)
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

  it('should create interaction', async () => {
    //given
    const response = await request(app.getHttpServer())
      .post('/interaction')
      .send({
        srcMemberId: 1,
        dstMemberId: 2,
        interactionType: 3,
      })
      .expect(201);

    expect(response.body.message).toEqual('상호작용 생성 성공');
    expect(response.body.data).toEqual(1);
  });

  it('should check interaction', async () => {
    //given
    const response = await request(app.getHttpServer())
      .get('/interaction')
      .query({ memberId: 2 })
      .expect(200);

    expect(response.body.message).toEqual('상호작용 조회 성공');
    expect(response.body.data).toEqual([
      ResponseInteractionDto.from(interaction),
    ]);
  });

  it('should delete interaction', async () => {
    //given
    const response = await request(app.getHttpServer())
      .delete('/interaction')
      .query({ memberId: 2 })
      .expect(200);

    expect(response.body.message).toEqual('상호작용 삭제 성공');
  });
});
