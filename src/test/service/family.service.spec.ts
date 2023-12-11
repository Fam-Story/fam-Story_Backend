import { Test, TestingModule } from '@nestjs/testing';
import {
  CreateFamilyDto,
  FamilyService,
  UpdateFamilyDto,
} from '../../domain/family';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Family, FamilyMember, User } from '../../infra/entities';

describe('FamilyService', () => {
  const mockRepository = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  });

  let familyService: FamilyService;
  let familyRepository;
  let familyMemberRepository;
  let userRepository;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        FamilyService,
        {
          provide: getRepositoryToken(Family),
          useFactory: mockRepository,
        },
        {
          provide: getRepositoryToken(FamilyMember),
          useFactory: mockRepository,
        },
        {
          provide: getRepositoryToken(User),
          useFactory: mockRepository,
        },
      ],
    }).compile();
    familyService = moduleRef.get<FamilyService>(FamilyService);
    familyRepository = moduleRef.get(getRepositoryToken(Family));
    familyMemberRepository = moduleRef.get(getRepositoryToken(FamilyMember));
    userRepository = moduleRef.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(familyService).toBeDefined();
  });

  it('should create family with hashed KeyCode', async () => {
    //given
    const familyKeyCode = familyService.createFamilyKeyCode();
    const createFamilyDto: CreateFamilyDto = {
      familyName: 'test',
    };
    const family = Family.createFamily(
      createFamilyDto.familyName,
      familyKeyCode,
    );
    family.setId(1);
    jest.spyOn(familyRepository, 'save').mockResolvedValue(family);
    jest.spyOn(familyRepository, 'findOne').mockResolvedValue(family);

    //when
    const savedFamilyId = await familyService.createFamily(createFamilyDto);
    const result = await familyService.findFamilyById(savedFamilyId);

    expect(result.familyName).toEqual('test');
    expect(familyKeyCode).toBeDefined();
    expect(familyKeyCode.length).toBe(10);
  });

  it('should find family by keyCode', async () => {
    //given
    const familyKeyCode = familyService.createFamilyKeyCode();
    const createFamilyDto: CreateFamilyDto = {
      familyName: 'test',
    };
    const family = Family.createFamily(
      createFamilyDto.familyName,
      familyKeyCode,
    );
    jest.spyOn(familyRepository, 'save').mockResolvedValue(1);
    jest.spyOn(familyRepository, 'findOne').mockResolvedValue(family);

    //when
    const result = await familyService.findFamilyByKeyCode(familyKeyCode);

    expect(result.familyKeyCode).toEqual(familyKeyCode);
  });

  it('should call delete function of repository', async () => {
    //given
    const familyKeyCode = familyService.createFamilyKeyCode();
    const createFamilyDto: CreateFamilyDto = {
      familyName: 'test',
    };
    const family = Family.createFamily(
      createFamilyDto.familyName,
      familyKeyCode,
    );
    const user = User.createUser('test', 'test', 'test', 'test', 1, 1);
    const familyMember = FamilyMember.createFamilyMember(1, family, user, '', '');
    familyMember.setId(1);
    family.setId(1);
    user.setId(1);

    jest.spyOn(familyRepository, 'save').mockResolvedValue(1);
    jest.spyOn(familyRepository, 'findOne').mockResolvedValue(family);
    jest.spyOn(familyRepository, 'delete').mockResolvedValue(null);
    jest
      .spyOn(familyMemberRepository, 'find')
      .mockResolvedValue([familyMember]);
    jest.spyOn(userRepository, 'update').mockResolvedValue(null);

    //when
    const savedFamilyId = await familyService.createFamily(createFamilyDto);
    await familyService.deleteFamily(savedFamilyId);

    expect(familyRepository.delete).toBeCalledTimes(1);
  });

  it('should update family', async () => {
    //given
    const familyKeyCode = familyService.createFamilyKeyCode();
    const updateFamilyDto: UpdateFamilyDto = {
      id: 1,
      familyName: 'testUpdated',
    };
    const family = Family.createFamily('test', familyKeyCode);
    jest.spyOn(familyRepository, 'update').mockResolvedValue(1);
    jest.spyOn(familyRepository, 'findOne').mockResolvedValue(family);

    await familyService.updateFamily(updateFamilyDto);

    expect(familyRepository.update).toBeCalledTimes(1);
    expect(familyRepository.findOne).toBeCalledTimes(1);
  });
});
