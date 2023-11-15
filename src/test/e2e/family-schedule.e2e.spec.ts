import { Test, TestingModule } from '@nestjs/testing';
import { FamilyScheduleController } from '../../domain/family-schedule';
import { FamilyScheduleService } from '../../domain/family-schedule';

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
