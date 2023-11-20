import { Test, TestingModule } from '@nestjs/testing';
import {
  FamilyScheduleService,
  ResponseFamilyScheduleDto,
} from '../../domain/family_schedule';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Family, FamilySchedule } from '../../infra/entities';
import { FamilyScheduleModule } from '../../module';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { JwtServiceAuthGuard } from '../../auth/guards/jwt-service-auth.guard';
import { MockJwtAuthGuard } from './mockAuthGuard';
import { PassportModule } from '@nestjs/passport';

describe('FamilyScheduleController', () => {
  let app: INestApplication;
  let mockFamilyScheduleService: Partial<FamilyScheduleService>;
  let mockFamilyRepository: Partial<Repository<Family>>;
  let mockFamilyScheduleRepository: Partial<Repository<FamilySchedule>>;

  const mockJwtServiceStrategy = {
    validate: jest.fn().mockResolvedValue({ id: 1, username: 'testuser' }),
  };

  const mockFamily = Family.createFamily('testFamily', 'testKeyCode');
  mockFamily.setId(1);
  const mockFamilySchedule = FamilySchedule.createFamilySchedule(
    'testSchedule',
    new Date(2021, 9, 10),
    mockFamily,
  );

  mockFamilySchedule.id = 2;
  beforeEach(async () => {
    mockFamilyScheduleService = {
      createFamilySchedule: jest.fn().mockResolvedValue(1),
      updateFamilySchedule: jest.fn(),
      deleteFamilySchedule: jest.fn(),
      findFamilyScheduleById: jest
        .fn()
        .mockResolvedValue(ResponseFamilyScheduleDto.from(mockFamilySchedule)),
      findFamilyScheduleList: jest
        .fn()
        .mockResolvedValue([
          ResponseFamilyScheduleDto.from(mockFamilySchedule),
        ]),
    };
    mockFamilyScheduleRepository = {
      findOne: jest.fn().mockResolvedValue(mockFamilySchedule),
      find: jest.fn().mockResolvedValue([mockFamilySchedule]),
    };
    mockFamilyRepository = {
      findOne: jest.fn().mockResolvedValue(mockFamily),
      find: jest.fn().mockResolvedValue(mockFamily),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        FamilyScheduleModule,
        PassportModule.register({ defaultStrategy: 'jwt-service' }),
      ],
    })
      .overrideProvider(FamilyScheduleService)
      .useValue(mockFamilyScheduleService)
      .overrideProvider(getRepositoryToken(FamilySchedule))
      .useValue(mockFamilyScheduleRepository)
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

  it('should return familySchedule id with path: /create (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/family-schedule')
      .send({
        scheduleName: 'test',
        scheduleDate: '2021-10-10',
        familyId: 1,
      })
      .expect(201);

    expect(response.body.message).toEqual('가족 일정 생성 성공');
    expect(response.body.data).toEqual(1);
  });

  it('should update FamilySchedule with path: /update (PATCH)', async () => {
    const response = await request(app.getHttpServer())
      .put('/family-schedule')
      .send({
        familyScheduleId: 1,
        scheduleName: 'test',
        scheduleDate: '2021-10-10',
        familyId: 1,
      })
      .expect(200);

    expect(mockFamilyScheduleService.updateFamilySchedule).toBeCalled();
    expect(response.body.message).toEqual('가족 일정 정보 수정 성공');
  });

  it('should delete FamilySchedule with path: /delete/:id (DELETE)', async () => {
    const response = await request(app.getHttpServer())
      .delete('/family-schedule')
      .query({ id: 1 })
      .expect(200);

    expect(mockFamilyScheduleService.deleteFamilySchedule).toBeCalled();
    expect(response.body.message).toEqual('가족 일정 삭제 성공');
  });

  it('should return familySchedule info with path: /:id (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/family-schedule')
      .query({ id: 1 })
      .expect(200);

    expect(response.body.message).toEqual('가족 일정 조회 성공');
    expect(response.body.data.familyId).toEqual(1);
    expect(response.body.data.scheduleId).toEqual(2);
    expect(response.body.data.scheduleName).toEqual('testSchedule');
  });

  it('should return familySchedule list with path: /list/:familyId (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/family-schedule/list')
      .query({ familyId: 1, year: 2021, targetMonth: 10 })
      .expect(200);

    expect(response.body.message).toEqual('가족 일정 조회 성공');
    expect(response.body.data[0].familyId).toEqual(1);
    expect(response.body.data[0].scheduleId).toEqual(2);
    expect(response.body.data[0].scheduleName).toEqual('testSchedule');
    expect(response.body.data[0].scheduleYear).toEqual(2021);
    expect(response.body.data[0].scheduleMonth).toEqual(10);
    expect(response.body.data[0].scheduleDay).toEqual(10);
  });
});
