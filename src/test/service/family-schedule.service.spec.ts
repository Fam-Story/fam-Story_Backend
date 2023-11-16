import { Test, TestingModule } from '@nestjs/testing';
import { FamilyScheduleService } from '../../domain/family_schedule';
import { Family, FamilySchedule } from '../../infra/entities';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('FamilyScheduleService', () => {
  const mockRepository = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  });

  const family = Family.createFamily('testFamily', 'testKeyCode');
  family.setId(1);

  let familyScheduleService: FamilyScheduleService;
  let familyScheduleRepository;
  let familyRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FamilyScheduleService,
        {
          provide: getRepositoryToken(FamilySchedule),
          useFactory: mockRepository,
        },
        {
          provide: getRepositoryToken(Family),
          useFactory: mockRepository,
        },
      ],
    }).compile();

    familyScheduleService = module.get<FamilyScheduleService>(
      FamilyScheduleService,
    );
    familyScheduleRepository = module.get(getRepositoryToken(FamilySchedule));
    familyRepository = module.get(getRepositoryToken(Family));
  });

  it('should be defined', () => {
    expect(familyScheduleService).toBeDefined();
  });

  it('should create family schedule', async () => {
    //given
    const createFamilyScheduleDto = {
      scheduleName: 'testSchedule',
      scheduleYear: 2021,
      scheduleMonth: 10,
      scheduleDay: 10,
      familyId: 1,
    };
    const familySchedule = FamilySchedule.createFamilySchedule(
      createFamilyScheduleDto.scheduleName,
      new Date(
        createFamilyScheduleDto.scheduleYear,
        createFamilyScheduleDto.scheduleMonth - 1,
        createFamilyScheduleDto.scheduleDay,
      ),
      family,
    );
    familySchedule.setId(1);

    jest.spyOn(familyRepository, 'findOne').mockResolvedValue(family);
    jest
      .spyOn(familyScheduleRepository, 'save')
      .mockResolvedValue(familySchedule);

    const savedFamilyScheduleId =
      await familyScheduleService.createFamilySchedule(createFamilyScheduleDto);

    expect(savedFamilyScheduleId).toEqual(1);
  });

  it('should update family schedule', async () => {
    //given
    family.setId(1);
    const familySchedule = FamilySchedule.createFamilySchedule(
      'testSchedule',
      new Date(2021, 9, 10),
      family,
    );
    familySchedule.setId(1);
    const updateFamilyScheduleDto = {
      familyScheduleId: 1,
      scheduleName: 'testSchedule',
      scheduleYear: 2021,
      scheduleMonth: 10,
      scheduleDay: 10,
      familyId: 1,
    };

    jest.spyOn(familyRepository, 'findOne').mockResolvedValue(family);
    jest
      .spyOn(familyScheduleRepository, 'findOne')
      .mockResolvedValue(familySchedule);
    jest
      .spyOn(familyScheduleRepository, 'save')
      .mockResolvedValue(familySchedule);

    await familyScheduleService.updateFamilySchedule(updateFamilyScheduleDto);

    expect(familyScheduleRepository.save).toBeCalledTimes(1);
  });

  it('should delete family schedule', async () => {
    //given
    const familySchedule = FamilySchedule.createFamilySchedule(
      'testSchedule',
      new Date(2021, 9, 10),
      family,
    );
    familySchedule.setId(1);
    const familyScheduleId = 1;

    jest.spyOn(familyRepository, 'findOne').mockResolvedValue(family);
    jest
      .spyOn(familyScheduleRepository, 'findOne')
      .mockResolvedValue(familySchedule);
    jest.spyOn(familyScheduleRepository, 'delete').mockResolvedValue(null);

    await familyScheduleService.deleteFamilySchedule(familyScheduleId);

    expect(familyScheduleRepository.delete).toBeCalledTimes(1);
  });

  it('should find family schedule by id', async () => {
    //given
    const familySchedule = FamilySchedule.createFamilySchedule(
      'testSchedule',
      new Date(2021, 9, 10),
      family,
    );
    familySchedule.setId(1);
    const familyScheduleId = 1;

    jest.spyOn(familyRepository, 'findOne').mockResolvedValue(family);
    jest
      .spyOn(familyScheduleRepository, 'findOne')
      .mockResolvedValue(familySchedule);

    const result =
      await familyScheduleService.findFamilyScheduleById(familyScheduleId);

    expect(result.scheduleName).toEqual('testSchedule');
    expect(result.scheduleYear).toEqual(2021);
    expect(result.scheduleMonth).toEqual(10);
    expect(result.scheduleDay).toEqual(10);
  });

  it('should find family schedule list', async () => {
    //given
    const family = Family.createFamily('testFamily', 'testKeyCode');
    family.setId(1);
    const familySchedule = FamilySchedule.createFamilySchedule(
      'testSchedule',
      new Date(2021, 9, 10),
      family,
    );
    familySchedule.setId(1);
    const familyId = 1;

    jest.spyOn(familyRepository, 'findOne').mockResolvedValue(family);
    jest
      .spyOn(familyScheduleRepository, 'find')
      .mockResolvedValue([familySchedule]);

    const result = await familyScheduleService.findFamilyScheduleList(
      familyId,
      2021,
      10,
    );

    expect(result[0].scheduleName).toEqual('testSchedule');
    expect(result[0].scheduleYear).toEqual(2021);
    expect(result[0].scheduleMonth).toEqual(10);
    expect(result[0].scheduleDay).toEqual(10);
  });
});
