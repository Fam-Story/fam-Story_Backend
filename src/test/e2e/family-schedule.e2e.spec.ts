import { Test, TestingModule } from '@nestjs/testing';
import { FamilyScheduleService } from '../../domain/family-schedule';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Family, FamilySchedule } from '../../infra/entities';
import { FamilyScheduleModule } from '../../module';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('FamilyScheduleController', () => {
  let app: INestApplication;
  let mockFamilyScheduleService: Partial<FamilyScheduleService>;
  let mockFamilyRepository: Partial<Repository<Family>>;
  let mockFamilyScheduleRepository: Partial<Repository<FamilySchedule>>;

  beforeEach(async () => {
    mockFamilyScheduleService = {
      createFamilySchedule: jest.fn().mockResolvedValue(1),
      updateFamilySchedule: jest.fn(),
    };
    mockFamilyScheduleRepository = {
      findOne: jest.fn(),
      find: jest.fn(),
    };
    mockFamilyRepository = {
      findOne: jest.fn(),
      find: jest.fn(),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [FamilyScheduleModule],
    })
      .overrideProvider(FamilyScheduleService)
      .useValue(mockFamilyScheduleService)
      .overrideProvider(getRepositoryToken(FamilySchedule))
      .useValue(mockFamilyScheduleRepository)
      .overrideProvider(getRepositoryToken(Family))
      .useValue(mockFamilyRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });
});
