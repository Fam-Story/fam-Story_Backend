import { Test, TestingModule } from '@nestjs/testing';
import { FamilyMemberService } from '../../domain/family-member';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Family, FamilyMember, User } from '../../infra/entities';
import { FamilyMemberModule } from '../../module';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';

describe('FamilyMemberController (e2e)', () => {
  let app: INestApplication;
  let mockFamilyMemberService: Partial<FamilyMemberService>;
  let mockFamilyRepository: Partial<Repository<Family>>;
  let mockFamilyMemberRepository: Partial<Repository<FamilyMember>>;
  let mockUserRepository: Partial<Repository<FamilyMember>>;

  const mockFamily: Family = Family.createFamily('test', 'testKeyCode');
  const mockUser: User = User.createUser('test', 'test', 'test', 'test', 1, 1);
  const mockFamilyMember: FamilyMember = FamilyMember.createFamilyMember(
    1,
    mockFamily,
    mockUser,
  );

  beforeEach(async () => {
    mockFamilyMemberService = {
      createFamilyMember: jest.fn().mockResolvedValue(1),
      updateFamilyMember: jest.fn(),
      deleteFamilyMember: jest.fn(),
      validateFamily: jest.fn().mockResolvedValue(mockFamily),
      validateFamilyMember: jest.fn().mockResolvedValue(mockFamilyMember),
      validateUser: jest.fn().mockResolvedValue(mockUser),
      findFamilyByMemberId: jest.fn().mockResolvedValue(mockFamily),
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
      imports: [FamilyMemberModule],
    })
      .overrideProvider(FamilyMemberService)
      .useValue(mockFamilyMemberService)
      .overrideProvider(getRepositoryToken(FamilyMember))
      .useValue(mockFamilyMemberRepository)
      .overrideProvider(getRepositoryToken(Family))
      .useValue(mockFamilyRepository)
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUserRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should get Family info with member id', async () => {
    const response = await request(app.getHttpServer())
      .get('/familymember/1')
      .expect(200);

    expect(response.body.message).toEqual('가족 조회 성공');
    expect(response.body.data.familyName).toEqual('test');
  });
});
