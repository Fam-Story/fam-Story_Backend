import { Test, TestingModule } from '@nestjs/testing';
import { FamilyController, FamilyService } from '../../domain/family';

describe('FamilyController', () => {
  let controller: FamilyController;
  let service: FamilyService;

  beforeEach(async () => {
    const mockFamilyService = {
      findAll: jest.fn().mockResolvedValue(['family1', 'family2']),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FamilyController],
      providers: [
        {
          provide: FamilyService,
          useValue: mockFamilyService,
        },
      ],
    }).compile();
    controller = module.get<FamilyController>(FamilyController);
    service = module.get<FamilyService>(FamilyService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
