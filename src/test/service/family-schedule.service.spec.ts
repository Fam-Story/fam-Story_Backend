import { Test, TestingModule } from '@nestjs/testing';
import { FamilyScheduleService } from '../../domain/family-schedule/family-schedule.service';
import {Family, FamilyMember, FamilySchedule} from '../../infra/entities';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('FamilyScheduleService', () => {
  const mockRepository = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  });

  let familyScheduleService: FamilyScheduleService;
  let familyScheduleRepository;
  let familyRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FamilyScheduleService,
        {
          provide: getRepositoryToken(FamilySchedule),
          useFactory: mockRepository,
        },
        {
          provide: getRepositoryToken(Family),
          useFactory: mockRepository,
        },
      ],
    }).compile();

    familyScheduleService = module.get<FamilyScheduleService>(
      FamilyScheduleService,
    );
    familyScheduleRepository = module.get(getRepositoryToken(FamilySchedule));
    familyRepository = module.get(getRepositoryToken(Family));
  });

  it('should be defined', () => {
    expect(familyScheduleService).toBeDefined();
  });
});
