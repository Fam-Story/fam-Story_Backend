import { Test, TestingModule } from '@nestjs/testing';
import {
  FamilyMemberService,
  ResponseFamilyMemberDto,
} from '../../domain/family_member';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Family, FamilyMember, User } from '../../infra/entities';
import { FamilyMemberModule } from '../../module';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { ResponseFamilyDto } from '../../domain/family';
import { JwtServiceAuthGuard } from '../../auth/guards/jwt-service-auth.guard';
import { MockJwtAuthGuard } from './mockAuthGuard';
import { PassportModule } from '@nestjs/passport';

describe('FamilyMemberController (e2e)', () => {
  let app: INestApplication;
  let mockFamilyMemberService: Partial<FamilyMemberService>;
  let mockFamilyRepository: Partial<Repository<Family>>;
  let mockFamilyMemberRepository: Partial<Repository<FamilyMember>>;
  let mockUserRepository: Partial<Repository<FamilyMember>>;
  const mockFamily: Family = Family.createFamily('test', 'testKeyCode');
  mockFamily.setId(2);
  const mockUser: User = User.createUser('test', 'test', 'test', 'test', 1, 1);
  mockUser.setId(3);
  const mockFamilyMember: FamilyMember = FamilyMember.createFamilyMember(
    1,
    mockFamily,
    mockUser,
    'test',
      'test'
  );
  mockFamilyMember.setId(1);

  beforeEach(async () => {
    mockFamilyMemberService = {
      createFamilyMember: jest.fn().mockResolvedValue(1),
      updateFamilyMember: jest.fn(),
      deleteFamilyMember: jest.fn(),
      validateFamily: jest.fn().mockResolvedValue(mockFamily),
      validateFamilyMember: jest.fn().mockResolvedValue(mockFamilyMember),
      validateUser: jest.fn().mockResolvedValue(mockUser),
      findFamilyByMemberId: jest
        .fn()
        .mockResolvedValue(ResponseFamilyDto.from(mockFamily)),
      findFamilyMemberByUserId: jest
        .fn()
        .mockResolvedValue(ResponseFamilyMemberDto.from(mockFamilyMember)),
      findAllFamilyMemberByFamilyId: jest
        .fn()
        .mockResolvedValue([ResponseFamilyMemberDto.from(mockFamilyMember)]),
      findFamilyMemberByMemberId: jest
        .fn()
        .mockResolvedValue(ResponseFamilyMemberDto.from(mockFamilyMember)),
    };

    mockFamilyRepository = {
      findOne: jest.fn().mockResolvedValue(mockFamily),
      find: jest.fn(),
    };

    mockFamilyMemberRepository = {
      findOne: jest.fn().mockResolvedValue(mockFamilyMember),
      find: jest.fn(),
    };

    mockUserRepository = {
      findOne: jest.fn().mockResolvedValue(mockUser),
      find: jest.fn(),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        FamilyMemberModule,
        PassportModule.register({ defaultStrategy: 'jwt-service' }),
      ],
    })
      .overrideProvider(FamilyMemberService)
      .useValue(mockFamilyMemberService)
      .overrideProvider(getRepositoryToken(FamilyMember))
      .useValue(mockFamilyMemberRepository)
      .overrideProvider(getRepositoryToken(Family))
      .useValue(mockFamilyRepository)
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUserRepository)
      .overrideGuard(JwtServiceAuthGuard)
      .useClass(MockJwtAuthGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create familyMember with path: /familymember/create (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/family-member')
      .send({
        familyId: 1,
        userId: 1,
        role: 1,
      })
      .expect(201);

    expect(response.body.message).toEqual('가족 멤버 생성 성공');
    expect(response.body.data).toEqual(1);
  });

  it('should update familyMember with path: /familymember/update (Patch)', async () => {
    const response = await request(app.getHttpServer())
      .put('/api/family-member')
      .send({
        familyMemberId: 1,
        role: 2,
      })
      .expect(200);

    expect(response.body.message).toEqual('가족 구성원 정보 수정 성공');
  });

  it('should delete familyMember with path: /familymember/delete (Delete)', async () => {
    const response = await request(app.getHttpServer())
      .delete('/api/family-member')
      .query({ id: 1 })
      .expect(200);

    expect(response.body.message).toEqual('가족 구성원 삭제 성공');
  });

  it('should get Family Member info with familyMember id', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/family-member')
      .query({ id: 1 })
      .expect(200);
    expect(response.body.message).toEqual('가족 구성원 조회 성공');
    expect(response.body.data.familyMemberId).toEqual(1);
    expect(response.body.data.pokeCount).toEqual(0);
    expect(response.body.data.talkCount).toEqual(0);
  });

  it('should get Family Member info with user id', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/family-member/user')
      .expect(200);
    expect(response.body.message).toEqual('가족 구성원 조회 성공');
    expect(response.body.data.familyMemberId).toEqual(1);
    expect(response.body.data.pokeCount).toEqual(0);
    expect(response.body.data.talkCount).toEqual(0);
  });

  it('should get Family info with member id', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/family-member/family')
      .send({
        familyMemberId: 1,
        fcmtoken: 'test',
      })
      .expect(201);

    expect(response.body.message).toEqual('가족 조회 성공');
    expect(response.body.data.familyName).toEqual('test');
    expect(response.body.data.familyKeyCode).toEqual('testKeyCode');
  });

  it('should get Family Member list with family id', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/family-member/list')
      .query({ id: 1 })
      .expect(200);

    expect(response.body.message).toEqual('가족 구성원 조회 성공');
    expect(response.body.data[0].familyMemberId).toEqual(1);
    expect(response.body.data[0].pokeCount).toEqual(0);
    expect(response.body.data[0].talkCount).toEqual(0);
  });
});
