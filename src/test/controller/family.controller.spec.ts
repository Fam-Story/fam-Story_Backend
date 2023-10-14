import { Test, TestingModule } from '@nestjs/testing';
import { FamilyController } from '../../domain/family/controller/family.controller';
import { FamilyService } from '../../domain/family/service/family.service';

describe('FamilyController', () => {
  let controller: FamilyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FamilyController],
      providers: [FamilyService],
    }).compile();

    controller = module.get<FamilyController>(FamilyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
