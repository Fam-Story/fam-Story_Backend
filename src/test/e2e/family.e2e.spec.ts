import { Test, TestingModule } from '@nestjs/testing';
import { FamilyService, ResponseFamilyDto } from '../../domain/family';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Family, FamilyMember, User } from '../../infra/entities';
import { FamilyModule } from '../../module';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { JwtServiceAuthGuard } from '../../auth/guards/jwt-service-auth.guard';
import { MockJwtAuthGuard } from './mockAuthGuard';
import { PassportModule } from '@nestjs/passport';
import { FamilyMemberService } from '../../domain/family_member';

describe('FamilyController (e2e)', () => {
  let app: INestApplication;
  let mockFamilyService: Partial<FamilyService>;
  let mockFamilyMemberService: Partial<FamilyMemberService>;
  let mockFamilyRepository: Partial<Repository<Family>>;
  let mockFamilyMemberRepository: Partial<Repository<FamilyMember>>;
  let mockUserRepository: Partial<Repository<User>>;

  const mockUser: User = User.createUser('test', 'test', 'test', 'test', 1, 1);
  const mockFamily: Family = Family.createFamily('test', 'testKeyCode');
  const mockFamilyMember: FamilyMember = FamilyMember.createFamilyMember(
    1,
    mockFamily,
    mockUser,
    'test',
    'test',
  );
  beforeEach(async () => {
    mockFamilyService = {
      findFamilyById: jest
        .fn()
        .mockResolvedValue(ResponseFamilyDto.from(mockFamily)),
      findFamilyByKeyCode: jest
        .fn()
        .mockResolvedValue(ResponseFamilyDto.from(mockFamily)),
      validateFamily: jest.fn().mockResolvedValue(mockFamily),
      createFamily: jest.fn().mockResolvedValue(1),
      deleteFamily: jest.fn(),
      updateFamily: jest.fn(),
    };

    mockFamilyRepository = {
      findOne: jest.fn().mockResolvedValue(mockFamily),
      find: jest.fn(),
    };

    mockFamilyMemberRepository = {
      findOne: jest.fn().mockResolvedValue(mockFamilyMember),
      find: jest.fn().mockResolvedValue([mockFamilyMember]),
    };

    mockUserRepository = {
      find: jest.fn(),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        FamilyModule,
        PassportModule.register({ defaultStrategy: 'jwt-service' }),
      ],
    })
      .overrideProvider(FamilyService)
      .useValue(mockFamilyService)
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUserRepository)
      .overrideProvider(getRepositoryToken(Family))
      .useValue(mockFamilyRepository)
      .overrideProvider(FamilyMemberService)
      .useValue(mockFamilyMemberService)
      .overrideProvider(getRepositoryToken(FamilyMember))
      .useValue(mockFamilyMemberRepository)
      .overrideGuard(JwtServiceAuthGuard)
      .useClass(MockJwtAuthGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return family info with path: /family (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/family')
      .query({ id: 1 })
      .expect(200);

    expect(response.body.message).toEqual('가족 조회 성공');
    expect(response.body.data.familyName).toEqual('test');
    expect(response.body.data.familyKeyCode).toEqual('testKeyCode');
  });

  it('should return family info with path: /family/keycode (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/family/join')
      .query({ keyCode: 'testKeyCode' })
      .expect(200);

    expect(response.body.message).toEqual('가족 조회 성공');
    expect(response.body.data.familyName).toEqual('test');
    expect(response.body.data.familyKeyCode).toEqual('testKeyCode');
  });

  it('should return id of created family with path: /family/create (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/family')
      .send({ familyName: 'test' })
      .expect(201);

    expect(response.body.message).toEqual('가족 생성 성공');
    expect(response.body.data).toEqual(1);
  });

  it('should return status code 200 when update family', async () => {
    const response = await request(app.getHttpServer())
      .put('/api/family')
      .send({ familyId: 1, familyName: 'test' })
      .expect(200);

    expect(response.body.message).toEqual('가족 정보 수정 성공');
  });

  it('should return status code 200 when delete family', async () => {
    const response = await request(app.getHttpServer())
      .delete('/api/family')
      .query({ id: 1 })
      .expect(200);

    expect(response.body.message).toEqual('가족 삭제 성공');
  });
});
