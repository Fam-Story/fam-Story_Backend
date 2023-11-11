import { Test, TestingModule } from '@nestjs/testing';
import { FamilyService, ResponseFamilyDto } from '../../domain/family';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Family } from '../../infra/entities';
import { FamilyModule } from '../../module';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';

describe('FamilyController (e2e)', () => {
  let app: INestApplication;
  let mockFamilyService: Partial<FamilyService>;
  let mockFamilyRepository: Partial<Repository<Family>>;
  const mockFamily: Family = Family.createFamily('test', 'testKeyCode');

  beforeEach(async () => {
    mockFamilyService = {
      findFamilyById: jest
        .fn()
        .mockResolvedValue(ResponseFamilyDto.from(mockFamily)),
      validateFamily: jest.fn().mockResolvedValue(mockFamily),
    };

    mockFamilyRepository = {
      find: jest.fn(),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [FamilyModule],
    })
      .overrideProvider(FamilyService)
      .useValue(mockFamilyService)
      .overrideProvider(getRepositoryToken(Family))
      .useValue(mockFamilyRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return family info with path: /family (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/family/1')
      .expect(200);

    expect(response.body.message).toEqual('가족 조회 성공');
    expect(response.body.data.familyName).toEqual('test');
    expect(response.body.data.familyKeyCode).toEqual('testKeyCode');
  });
});
