import { Test, TestingModule } from '@nestjs/testing';
import { IndividualScheduleService } from '../../domain/family/service/individual-schedule.service';

describe('IndividualScheduleService', () => {
  let service: IndividualScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IndividualScheduleService],
    }).compile();

    service = module.get<IndividualScheduleService>(IndividualScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
