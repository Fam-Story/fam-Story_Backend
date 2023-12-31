import { Injectable } from '@nestjs/common';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { ResponseCode } from '../../common';
import { FamilyMemberException } from '../../common/exception/family-member.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { FamilyMember, Interaction } from '../../infra/entities';
import { Repository } from 'typeorm';
import { ResponseInteractionDto } from './dto/response-interaction.dto';

@Injectable()
export class InteractionService {
  constructor(
    @InjectRepository(Interaction)
    private interactionRepository: Repository<Interaction>,
    @InjectRepository(FamilyMember)
    private familyMemberRepository: Repository<FamilyMember>,
  ) {}
  async createInteraction(createInteractionDto: CreateInteractionDto) {
    const srcFamilyMember = await this.familyMemberRepository.findOne({
      where: { id: createInteractionDto.srcMemberId },
      relations: ['user'],
    });
    const dstFamilyMember = await this.familyMemberRepository.findOne({
      where: { id: createInteractionDto.dstMemberId },
      relations: ['user'],
    });
    const interaction: Interaction = Interaction.createInteraction(
      createInteractionDto.srcMemberId,
      dstFamilyMember,
      createInteractionDto.interactionType,
      srcFamilyMember.user.username,
      srcFamilyMember.role,
    );
    const savedInteraction = await this.interactionRepository.save(interaction);
    return [
      savedInteraction.id,
      dstFamilyMember.fcmToken,
      srcFamilyMember.user.username,
      dstFamilyMember.user.username,
    ];
  }

  async findAllInteractions(familyMemberId: number) {
    await this.validateFamilyMember(familyMemberId);
    const interactions = await this.interactionRepository.find({
      where: { dstMember: { id: familyMemberId } },
      relations: ['dstMember'],
    });

    return interactions.map((interaction) =>
      ResponseInteractionDto.from(interaction),
    );
  }

  async checkAllInteractions(familyMemberId: number) {
    const interactions = await this.interactionRepository.find({
      where: { dstMember: { id: familyMemberId } },
      relations: ['dstMember'],
    });
    interactions.forEach((interaction) => {
      interaction.isChecked = true;
    });
    await this.interactionRepository.save(interactions);
  }

  async deleteAllInteractions(familyMemberId: number) {
    await this.validateFamilyMember(familyMemberId);
    await this.interactionRepository.delete({
      dstMember: { id: familyMemberId },
    });
  }
  async validateFamilyMember(familyMemberId: number) {
    const familyMember = await this.familyMemberRepository.findOne({
      where: { id: familyMemberId },
    });
    if (!familyMember) {
      throw new FamilyMemberException(ResponseCode.FAMILY_MEMBER_NOT_FOUND);
    }
    return familyMember;
  }
}
