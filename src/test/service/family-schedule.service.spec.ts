import { Test, TestingModule } from '@nestjs/testing';
import { FamilyScheduleService } from '../../domain/family/service/family-schedule.service';

describe('FamilyScheduleService', () => {
  let service: FamilyScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FamilyScheduleService],
    }).compile();

    service = module.get<FamilyScheduleService>(FamilyScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
