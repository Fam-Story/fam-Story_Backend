import { Test, TestingModule } from '@nestjs/testing';
import { InteractionService } from '../../domain/interaction/interaction.service';
import { INestApplication } from '@nestjs/common';
import { Interaction } from '../../infra/entities';
import { Repository } from 'typeorm';
import { InteractionModule } from '../../module';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('InteractionController', () => {
  let app: INestApplication;
  let mockInteractionService: Partial<InteractionService>;
  let mockInteractionRepository: Partial<Repository<Interaction>>;
  let mockFamilyMemberRepository: Partial<Repository<Interaction>>;

  beforeEach(async () => {
    mockInteractionService = {
      createInteraction: jest.fn().mockResolvedValue(1),
      findAllInteractions: jest.fn(),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [InteractionModule],
    })
      .overrideProvider(InteractionService)
      .useValue(mockInteractionService)
      .overrideProvider(getRepositoryToken(Interaction))
      .useValue(mockInteractionRepository)
      .overrideProvider(getRepositoryToken(Interaction))
      .useValue(mockFamilyMemberRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });
});
