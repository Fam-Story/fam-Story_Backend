import { Test, TestingModule } from '@nestjs/testing';
import { InteractionController } from '../../domain/interaction/interaction.controller';
import { InteractionService } from '../../domain/interaction/interaction.service';

describe('InteractionController', () => {
  let controller: InteractionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InteractionController],
      providers: [InteractionService],
    }).compile();

    controller = module.get<InteractionController>(InteractionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
