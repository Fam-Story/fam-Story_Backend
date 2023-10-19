import { Test, TestingModule } from '@nestjs/testing';
import { PhotoController } from '../../domain/family/controller/photo.controller';
import { PhotoService } from '../../domain/family/service/photo.service';

describe('PhotoController', () => {
  let controller: PhotoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhotoController],
      providers: [PhotoService],
    }).compile();

    controller = module.get<PhotoController>(PhotoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
