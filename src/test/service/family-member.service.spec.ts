import { Test, TestingModule } from '@nestjs/testing';
import {
  CreateFamilyMemberDto,
  FamilyMemberService,
  UpdateFamilyMemberDto,
} from '../../domain/family_member';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Family, FamilyMember, User } from '../../infra/entities';
import { GetFamilyInfoDto } from '../../domain/family_member/dto/request/get-family-info.dto';

describe('FamilyMemberService', () => {
  const mockRepository = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
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
      fcmToken: 'test',
      introMessage: 'test',
    };
    const family: Family = Family.createFamily('test', 'testKeyCode');
    const user: User = User.createUser('test', 'test', 'test', 'test', 1, 1);
    const familyMember = FamilyMember.createFamilyMember(
      createFamilyMemberDto.role,
      family,
      user,
      createFamilyMemberDto.fcmToken,
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

  it('should update family-member', async () => {
    const updateFamilyMemberDto: UpdateFamilyMemberDto = {
      role: 1,
      id: 1,
    };
    const family: Family = Family.createFamily('test', 'testKeyCode');
    const user: User = User.createUser('test', 'test', 'test', 'test', 1, 1);
    const familyMember = FamilyMember.createFamilyMember(1, family, user, '');
    user.id = 1;
    familyMember.setId(1);

    jest
      .spyOn(familyMemberRepository, 'update')
      .mockResolvedValue(familyMember);
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
    jest.spyOn(familyRepository, 'findOne').mockResolvedValue(family);
    jest.spyOn(familyMemberRepository, 'findOne').mockResolvedValue(family);

    await familyMemberService.updateFamilyMember(updateFamilyMemberDto);
    expect(familyMemberRepository.update).toBeCalled();
  });

  it('should delete family-member', async () => {
    const family: Family = Family.createFamily('test', 'testKeyCode');
    const user = User.createUser('test', 'test', 'test', 'test', 1, 1);
    const familyMember = FamilyMember.createFamilyMember(1, family, user, '');
    familyMember.setId(1);

    jest
      .spyOn(familyMemberRepository, 'findOne')
      .mockResolvedValue(familyMember);
    jest.spyOn(familyRepository, 'findOne').mockResolvedValue(family);
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
    jest.spyOn(familyMemberRepository, 'delete').mockResolvedValue(null);

    await familyMemberService.deleteFamilyMember(1);
    expect(familyMemberRepository.delete).toBeCalled();
  });

  it('should find family-member by user id', async () => {
    const family: Family = Family.createFamily('test', 'testKeyCode');
    const user = User.createUser('test', 'test', 'test', 'test', 1, 1);
    const familyMember = FamilyMember.createFamilyMember(1, family, user, '');
    familyMember.setId(1);

    jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
    jest
      .spyOn(familyMemberRepository, 'findOne')
      .mockResolvedValue(familyMember);

    const result = await familyMemberService.findFamilyMemberByUserId(1);
    expect(result.familyMemberId).toEqual(1);
  });

  it('should find family by family-member id', async () => {
    const family: Family = Family.createFamily('test', 'testKeyCode');
    const user = User.createUser('test', 'test', 'test', 'test', 1, 1);
    const familyMember = FamilyMember.createFamilyMember(1, family, user, '');
    const getFamilyInfoDto: GetFamilyInfoDto = {
      familyMemberId: 1,
      fcmToken: 'test',
    };
    familyMember.setId(1);
    family.setId(1);

    jest
      .spyOn(familyMemberRepository, 'findOne')
      .mockResolvedValue(familyMember);
    jest.spyOn(familyRepository, 'findOne').mockResolvedValue(family);

    const result =
      await familyMemberService.findFamilyByMemberId(getFamilyInfoDto);
    expect(result.familyId).toEqual(1);
    expect(result.familyName).toEqual('test');
  });

  it('should find all family-member by family id', async () => {
    const family: Family = Family.createFamily('test', 'testKeyCode');
    const user = User.createUser('test', 'test', 'test', 'test', 1, 1);
    const familyMember = FamilyMember.createFamilyMember(1, family, user, '');
    familyMember.setId(10);
    family.setId(1);

    jest.spyOn(familyRepository, 'findOne').mockResolvedValue(family);
    jest
      .spyOn(familyMemberRepository, 'find')
      .mockResolvedValue([familyMember]);

    const result = await familyMemberService.findAllFamilyMemberByFamilyId(1);
    expect(result[0].familyMemberId).toEqual(10);
  });

  it('should find family-member by family-member id', async () => {
    const family: Family = Family.createFamily('test', 'testKeyCode');
    const user = User.createUser('test', 'test', 'test', 'test', 1, 1);
    const familyMember = FamilyMember.createFamilyMember(1, family, user, '');
    familyMember.setId(1);

    jest
      .spyOn(familyMemberRepository, 'findOne')
      .mockResolvedValue(familyMember);

    const result = await familyMemberService.findFamilyMemberByMemberId(1);
    expect(result.familyMemberId).toEqual(1);
  });
});
