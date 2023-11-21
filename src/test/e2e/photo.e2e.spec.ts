import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Family, Photo } from '../../infra/entities';
import { Repository } from 'typeorm';
import { PhotoModule } from '../../module';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { PhotoService, ResponsePhotoDto } from '../../domain/photo';
import { JwtServiceAuthGuard } from '../../auth/guards/jwt-service-auth.guard';
import { MockJwtAuthGuard } from './mockAuthGuard';
import { PassportModule } from '@nestjs/passport';

describe('PhotoController (e2e)', () => {
  let app: INestApplication;
  let mockPhotoService: Partial<PhotoService>;
  let mockPhotoRepository: Partial<Repository<Photo>>;
  let mockFamilyRepository: Partial<Repository<Family>>;
  const photo: Photo = Photo.createPhoto(
    'test.com',
    'test',
    Family.createFamily('test', 'testKeyCode'),
  );
  photo.id = 1;

  beforeEach(async () => {
    mockPhotoService = {
      createPhoto: jest.fn().mockResolvedValue(1),
      updatePhotoInfo: jest.fn(),
      deletePhoto: jest.fn(),
      getPhotos: jest.fn().mockResolvedValue([ResponsePhotoDto.from(photo)]),
      getPhotoInfo: jest.fn().mockResolvedValue(ResponsePhotoDto.from(photo)),
    };
    mockPhotoRepository = {
      findOne: jest.fn(),
      find: jest.fn(),
    };
    mockFamilyRepository = {
      findOne: jest.fn(),
      find: jest.fn(),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        PhotoModule,
        PassportModule.register({ defaultStrategy: 'jwt-service' }),
      ],
    })
      .overrideProvider(PhotoService)
      .useValue(mockPhotoService)
      .overrideProvider(getRepositoryToken(Photo))
      .useValue(mockPhotoRepository)
      .overrideProvider(getRepositoryToken(Family))
      .useValue(mockFamilyRepository)
      .overrideGuard(JwtServiceAuthGuard)
      .useClass(MockJwtAuthGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('should create photo', async () => {
    const response = await request(app.getHttpServer())
      .post('/photo')
      .send({
        s3imageUrl: 'test',
        name: 'test',
        createdDate: new Date(),
        familyId: 1,
      })
      .expect(201);

    expect(response.body.message).toBe('사진 생성 성공');
    expect(response.body.data).toBe(1);
  });

  it('should update photo', async () => {
    const response = await request(app.getHttpServer())
      .put('/photo')
      .send({
        photoId: 1,
        name: 'test',
      })
      .expect(200);

    expect(response.body.message).toBe('사진 정보 수정 성공');
  });

  it('should delete post', async () => {
    const response = await request(app.getHttpServer())
      .delete('/photo')
      .query({ photoId: 1 })
      .expect(200);

    expect(response.body.message).toBe('사진 삭제 성공');
  });

  it('should get photos', async () => {
    const response = await request(app.getHttpServer())
      .get('/photo/list')
      .query({ familyId: 1, page: 1, limit: 10 })
      .expect(200);

    expect(response.body.message).toBe('사진 조회 성공');
    expect(response.body.data[0].photoId).toEqual(1);
    expect(response.body.data[0].photoName).toEqual('test');
    expect(response.body.data[0].photoUrl).toEqual('test.com');
  });
});
