import { Test, TestingModule } from '@nestjs/testing';
import {
  InteractionService,
  CreateInteractionDto,
} from '../../domain/interaction';
import { Family, FamilyMember, Interaction, User } from '../../infra/entities';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('InteractionService', () => {
  const mockRepository = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  });

  let interactionService: InteractionService;
  let interactionRepository;
  let familyMemberRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InteractionService,
        {
          provide: getRepositoryToken(Interaction),
          useFactory: mockRepository,
        },
        {
          provide: getRepositoryToken(FamilyMember),
          useFactory: mockRepository,
        },
      ],
    }).compile();

    interactionService = module.get<InteractionService>(InteractionService);
    interactionRepository = module.get(getRepositoryToken(Interaction));
    familyMemberRepository = module.get(getRepositoryToken(FamilyMember));
  });

  it('should be defined', () => {
    expect(interactionService).toBeDefined();
  });

  it('should create interaction', async () => {
    //given
    const family = Family.createFamily('test', 'test');
    const user = User.createUser('test', 'test', 'test', 'test', 10, 1);
    user.setId(1);
    family.setId(2);
    const dstFamilyMember = FamilyMember.createFamilyMember(
      1,
      family,
      user,
      '',
    );
    dstFamilyMember.fcmToken = 'test';
    dstFamilyMember.setId(3);
    const createInteractionDto: CreateInteractionDto = {
      srcMemberId: 1,
      dstMemberId: 2,
      interactionType: 3,
    };
    const interaction = Interaction.createInteraction(
      createInteractionDto.srcMemberId,
      dstFamilyMember,
      createInteractionDto.interactionType,
      dstFamilyMember.user.username,
      dstFamilyMember.role,
    );
    interaction.id = 4;

    jest
      .spyOn(familyMemberRepository, 'findOne')
      .mockResolvedValue(dstFamilyMember);
    jest.spyOn(interactionRepository, 'save').mockResolvedValue(interaction);

    const savedInteraction =
      await interactionService.createInteraction(createInteractionDto);

    expect(savedInteraction[0]).toEqual(interaction.id);
    expect(savedInteraction[1]).toEqual(interaction.dstMember.fcmToken);
    expect(savedInteraction[2]).toEqual(
      interaction.dstMember.family.familyName,
    );
    expect(savedInteraction[3]).toEqual(interaction.dstMember.user.username);
  });

  it('should find all interactions', async () => {
    //given
    const familyMemberId = 1;
    const dstFamilyMember = FamilyMember.createFamilyMember(1, null, null, '');
    dstFamilyMember.setId(2);
    const interaction = Interaction.createInteraction(
      1,
      dstFamilyMember,
      2,
      '',
      1,
    );
    interaction.id = 3;
    const interactions = [interaction];
    jest.spyOn(interactionRepository, 'find').mockResolvedValue(interactions);
    jest
      .spyOn(familyMemberRepository, 'findOne')
      .mockResolvedValue(dstFamilyMember);

    const foundInteractions =
      await interactionService.findAllInteractions(familyMemberId);

    expect(foundInteractions[0].interactionId).toEqual(3);
    expect(foundInteractions[0].interactionType).toEqual(2);
    expect(foundInteractions[0].srcMemberId).toEqual(1);
    expect(foundInteractions[0].dstMemberId).toEqual(2);
  });

  it('should check all interactions', async () => {
    //given
    const familyMemberId = 1;
    const dstFamilyMember = FamilyMember.createFamilyMember(1, null, null, '');
    const interaction = Interaction.createInteraction(
      1,
      dstFamilyMember,
      2,
      '',
      1,
    );
    const interactions = [interaction];

    jest.spyOn(interactionRepository, 'find').mockResolvedValue(interactions);
    jest
      .spyOn(familyMemberRepository, 'findOne')
      .mockResolvedValue(dstFamilyMember);
    jest.spyOn(interactionRepository, 'save').mockResolvedValue(interactions);

    await interactionService.checkAllInteractions(familyMemberId);

    expect(interaction.isChecked).toEqual(true);
  });

  it('should delete interaction', async () => {
    //given
    const interactionId = 1;
    const interaction = Interaction.createInteraction(1, null, 2, '', 1);
    const familyMember = FamilyMember.createFamilyMember(1, null, null, '');

    jest.spyOn(interactionRepository, 'findOne').mockResolvedValue(interaction);
    jest.spyOn(interactionRepository, 'delete').mockResolvedValue(null);
    jest
      .spyOn(familyMemberRepository, 'findOne')
      .mockResolvedValue(familyMember);

    await interactionService.deleteAllInteractions(interactionId);

    expect(interactionRepository.delete).toBeCalledTimes(1);
  });
});
