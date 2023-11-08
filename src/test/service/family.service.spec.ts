import { Test, TestingModule } from '@nestjs/testing';
import {
  CreateFamilyDto,
  FamilyService,
  UpdateFamilyDto,
} from '../../domain/family';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Family } from '../../infra/entities';

describe('FamilyService', () => {
  const mockRepository = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  });

  let familyService: FamilyService;
  let familyRepository;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        FamilyService,
        {
          provide: getRepositoryToken(Family),
          useFactory: mockRepository,
        },
      ],
    }).compile();
    familyService = moduleRef.get<FamilyService>(FamilyService);
    familyRepository = moduleRef.get(getRepositoryToken(Family));
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
    jest.spyOn(familyRepository, 'save').mockResolvedValue(1);
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
    jest.spyOn(familyRepository, 'save').mockResolvedValue(1);
    jest.spyOn(familyRepository, 'findOne').mockResolvedValue(family);
    jest.spyOn(familyRepository, 'delete').mockResolvedValue(null);

    //when
    const savedFamilyId = await familyService.createFamily(createFamilyDto);
    await familyService.deleteFamily(savedFamilyId);

    expect(familyRepository.delete).toBeCalledTimes(1);
  });

  it('should update family', async () => {
    //given
    const familyKeyCode = familyService.createFamilyKeyCode();
    const updateFamilyDto: UpdateFamilyDto = {
      familyId: 1,
      familyName: 'testUpdated',
    };
    const family = Family.createFamily('test', familyKeyCode);
    jest.spyOn(familyRepository, 'save').mockResolvedValue(1);
    jest.spyOn(familyRepository, 'findOne').mockResolvedValue(family);

    await familyService.updateFamily(updateFamilyDto);

    expect(familyRepository.save).toBeCalledTimes(1);
    expect(familyRepository.findOne).toBeCalledTimes(1);
  });
});
