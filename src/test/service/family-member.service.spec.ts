import { Test, TestingModule } from '@nestjs/testing';
import {
  CreateFamilyMemberDto,
  FamilyMemberService,
} from '../../domain/family_member';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Family, FamilyMember, User } from '../../infra/entities';

describe('FamilyMemberService', () => {
  const mockRepository = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  });

  let familyMemberService: FamilyMemberService;
  let familyMemberRepository;
  let familyRepository;
  let userRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FamilyMemberService,
        {
          provide: getRepositoryToken(FamilyMember),
          useFactory: mockRepository,
        },
        {
          provide: getRepositoryToken(Family),
          useFactory: mockRepository,
        },
        {
          provide: getRepositoryToken(User),
          useFactory: mockRepository,
        },
      ],
    }).compile();

    familyMemberService = module.get<FamilyMemberService>(FamilyMemberService);
    familyMemberRepository = module.get(getRepositoryToken(FamilyMember));
    familyRepository = module.get(getRepositoryToken(Family));
    userRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(familyMemberService).toBeDefined();
  });

  it('should save family-member', async () => {
    const createFamilyMemberDto: CreateFamilyMemberDto = {
      role: 1,
      familyId: 1,
    };
    const family: Family = Family.createFamily('test', 'testKeyCode');
    const user: User = User.createUser('test', 'test', 'test', 'test', 1, 1);
    const familyMember = FamilyMember.createFamilyMember(
      createFamilyMemberDto.role,
      family,
      user,
    );
    user.id = 1;
    familyMember.setId(1);

    jest.spyOn(familyMemberRepository, 'save').mockResolvedValue(familyMember);
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
    jest.spyOn(familyRepository, 'findOne').mockResolvedValue(family);

    const savedFamilyMemberId = await familyMemberService.createFamilyMember(
      user.id,
      createFamilyMemberDto,
    );
    expect(savedFamilyMemberId).toEqual(1);
  });
});
