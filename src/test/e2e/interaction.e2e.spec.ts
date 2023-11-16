import { Test, TestingModule } from '@nestjs/testing';
import { InteractionService } from '../../domain/interaction/interaction.service';
import { INestApplication } from '@nestjs/common';
import { FamilyMember, Interaction } from '../../infra/entities';
import { Repository } from 'typeorm';
import { InteractionModule } from '../../module';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('InteractionController', () => {
  let app: INestApplication;
  let mockInteractionService: Partial<InteractionService>;
  let mockInteractionRepository: Partial<Repository<Interaction>>;
  let mockFamilyMemberRepository: Partial<Repository<FamilyMember>>;

  beforeEach(async () => {
    mockInteractionService = {
      createInteraction: jest.fn().mockResolvedValue(1),
      findAllInteractions: jest.fn(),
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
      imports: [InteractionModule],
    })
      .overrideProvider(InteractionService)
      .useValue(mockInteractionService)
      .overrideProvider(getRepositoryToken(Interaction))
      .useValue(mockInteractionRepository)
      .overrideProvider(getRepositoryToken(FamilyMember))
      .useValue(mockFamilyMemberRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });
});
