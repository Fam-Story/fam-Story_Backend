import { Test, TestingModule } from '@nestjs/testing';
import {
  CreatePhotoDto,
  PhotoService,
  ResponsePhotoDto,
} from '../../domain/photo';
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

  it('should delete photo', async () => {
    const photo = Photo.createPhoto(
      'test',
      'test',
      Family.createFamily('test', 'testKeyCode'),
    );
    photo.setId(1);

    jest.spyOn(photoRepository, 'findOne').mockResolvedValue(photo);

    await photoService.deletePhoto(1);
    expect(photoRepository.delete).toBeCalledWith(1);
  });

  it('should get photos in pages', async () => {
    const family = Family.createFamily('test', 'testKeyCode');
    const first_photo = Photo.createPhoto('testurl1', 'testone', family);
    const second_photo = Photo.createPhoto('testurl2', 'testtwo', family);

    const photoList = [first_photo, second_photo];

    first_photo.setId(2);
    second_photo.setId(3);
    family.setId(1);

    jest.spyOn(familyRepository, 'findOne').mockResolvedValue(family);
    jest.spyOn(photoRepository, 'find').mockResolvedValue(photoList);

    const result: ResponsePhotoDto[] = await photoService.getPhotos(
      family.id,
      1,
      1,
    );

    expect(result.length).toEqual(1);
    expect(result[0].photoName).toEqual('testone');
  });

  it('should get photo info', async () => {
    const family = Family.createFamily('test', 'testKeyCode');
    const photo = Photo.createPhoto('testurl1', 'testone', family);
    photo.setId(1);

    jest.spyOn(photoRepository, 'findOne').mockResolvedValue(photo);

    const result: ResponsePhotoDto = await photoService.getPhotoInfo(photo.id);

    expect(result.photoName).toEqual('testone');
    expect(result.photoUrl).toEqual('testurl1');
  });

  it('should update photo info', async () => {
    const family = Family.createFamily('test', 'testKeyCode');
    const oldPhoto = Photo.createPhoto('testurlold', 'testold', family);

    const updatePhotoDto = {
      photoId: 1,
      name: 'testnew',
    };
    oldPhoto.setId(1);

    jest.spyOn(photoRepository, 'findOne').mockResolvedValue(oldPhoto);
    jest.spyOn(photoRepository, 'save').mockResolvedValue(oldPhoto);

    await photoService.updatePhotoInfo(updatePhotoDto);

    expect(photoRepository.save).toBeCalledTimes(1);
  });
});
