import { Test, TestingModule } from '@nestjs/testing';
import { FamilyService } from '../../domain/family';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Family } from '../../infra/entities';

describe('FamilyService', () => {
  const mockRepository = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
  });

  let familyService: FamilyService;
  let familyRepository;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        FamilyService,
        {
          provide: getRepositoryToken(Family),
          useFactory: mockRepository,
        },
      ],
    }).compile();
    familyService = moduleRef.get<FamilyService>(FamilyService);
    familyRepository = moduleRef.get(getRepositoryToken(Family));
  });

  it('should be defined', () => {
    expect(familyService).toBeDefined();
  });
});
