import { Test, TestingModule } from '@nestjs/testing';
import { IndividualScheduleController } from '../../domain/family/controller/individual-schedule.controller';
import { IndividualScheduleService } from '../../domain/family/service/individual-schedule.service';

describe('IndividualScheduleController', () => {
  let controller: IndividualScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IndividualScheduleController],
      providers: [IndividualScheduleService],
    }).compile();

    controller = module.get<IndividualScheduleController>(
      IndividualScheduleController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
