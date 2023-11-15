import { Test, TestingModule } from '@nestjs/testing';
import { InteractionService } from '../../domain/interaction/interaction.service';
import { FamilyMember, Interaction } from '../../infra/entities';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('InteractionService', () => {
  const mockRepository = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  });

  let interactionService: InteractionService;
  let interactionRepository;
  let familyMemberRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InteractionService,
        {
          provide: getRepositoryToken(Interaction),
          useFactory: mockRepository,
        },
        {
          provide: getRepositoryToken(FamilyMember),
          useFactory: mockRepository,
        },
      ],
    }).compile();

    interactionService = module.get<InteractionService>(InteractionService);
    interactionRepository = module.get(getRepositoryToken(Interaction));
    familyMemberRepository = module.get(getRepositoryToken(FamilyMember));
  });

  it('should be defined', () => {
    expect(interactionService).toBeDefined();
  });
});
