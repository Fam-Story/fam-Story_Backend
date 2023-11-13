import { Test, TestingModule } from '@nestjs/testing';
import { CreatePhotoDto, PhotoService } from '../../domain/photo';
import { Family, Photo } from '../../infra/entities';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PhotoService', () => {
  const mockPhotoRepository = () => ({
    save: jest.fn(),
    delete: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  });
  const mockFamilyRepository = () => ({
    findOne: jest.fn(),
  });
  let photoService: PhotoService;
  let photoRepository;
  let familyRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PhotoService,
        {
          provide: getRepositoryToken(Photo),
          useFactory: mockPhotoRepository,
        },
        {
          provide: getRepositoryToken(Family),
          useFactory: mockFamilyRepository,
        },
      ],
    }).compile();

    photoService = module.get<PhotoService>(PhotoService);
    photoRepository = module.get(getRepositoryToken(Photo));
    familyRepository = module.get(getRepositoryToken(Family));
  });

  it('should be defined', () => {
    expect(photoService).toBeDefined();
    expect(photoRepository).toBeDefined();
    expect(familyRepository).toBeDefined();
  });

  it('should create photo', async () => {
    const createPhotoDto: CreatePhotoDto = {
      s3imageUrl: 'test',
      name: 'test',
      createdDate: new Date(),
      familyId: 1,
    };
    const family = Family.createFamily('test', 'testKeyCode');
    const photo = Photo.createPhoto(
      createPhotoDto.s3imageUrl,
      createPhotoDto.name,
      family,
    );
    photo.setId(1);

    jest.spyOn(familyRepository, 'findOne').mockResolvedValue(family);
    jest.spyOn(photoRepository, 'save').mockResolvedValue(photo);

    const savedPhotoId = await photoService.createPhoto(createPhotoDto);
    expect(savedPhotoId).toEqual(1);
  });
});
