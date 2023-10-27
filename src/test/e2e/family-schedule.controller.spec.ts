import { Test, TestingModule } from '@nestjs/testing';
import { FamilyScheduleController } from '../../domain/family-schedule/family-schedule.controller';
import { FamilyScheduleService } from '../../domain/family-schedule/family-schedule.service';

describe('FamilyScheduleController', () => {
  let controller: FamilyScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FamilyScheduleController],
      providers: [FamilyScheduleService],
    }).compile();

    controller = module.get<FamilyScheduleController>(FamilyScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
