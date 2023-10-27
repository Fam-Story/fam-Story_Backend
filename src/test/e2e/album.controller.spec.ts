import { Test, TestingModule } from '@nestjs/testing';
import { AlbumController } from '../../domain/album/album.controller';
import { AlbumService } from '../../domain/album/album.service';

describe('AlbumController', () => {
  let controller: AlbumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlbumController],
      providers: [AlbumService],
    }).compile();

    controller = module.get<AlbumController>(AlbumController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
