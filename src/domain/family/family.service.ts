import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { CreateFamilyDto, ResponseFamilyDto, UpdateFamilyDto } from './dto';
import { Family, FamilyMember, User } from '../../infra/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FamilyException } from '../../common/exception/family.exception';
import { ResponseCode } from '../../common';

@Injectable()
export class FamilyService {
  constructor(
    @InjectRepository(Family) private familyRepository: Repository<Family>,
    @InjectRepository(FamilyMember)
    private familyMemberRepository: Repository<FamilyMember>,
    @InjectRepository(FamilyMember) private userRepository: Repository<User>,
  ) {}

  //가족 고유 해쉬키 생성
  createFamilyKeyCode(): string {
    return crypto.randomBytes(5).toString('hex');
  }

  //가족 엔티티 추가
  async createFamily(createFamilyDto: CreateFamilyDto) {
    const familyKeyCode = this.createFamilyKeyCode();
    const family: Family = Family.createFamily(
      createFamilyDto.familyName,
      familyKeyCode,
    );

    const savedFamily = await this.familyRepository.save(family);
    return savedFamily.id;
  }

  //가족 엔티티 반환 (id로)
  async findFamilyById(familyId: number): Promise<ResponseFamilyDto> {
    const family = await this.validateFamily(familyId);
    return ResponseFamilyDto.from(family);
  }

  //가족 엔티티 반환 (keyCode로)
  async findFamilyByKeyCode(keyCode: string): Promise<ResponseFamilyDto> {
    const family = await this.familyRepository.findOne({
      where: { keyCode: keyCode },
    });
    if (!family) {
      throw new FamilyException(ResponseCode.FAMILY_NOT_FOUND);
    }
    return ResponseFamilyDto.from(family);
  }

  //가족과 가족 구성원 모두 삭제
  async deleteFamily(familyId: number): Promise<void> {
    await this.validateFamily(familyId);
    const familyMembers = await this.familyMemberRepository.find({
      where: { family: { id: familyId } },
      relations: ['user'],
    });
    for (const familyMember of familyMembers) {
      await this.userRepository.update(familyMember.user.id, {
        belongsToFamily: false,
      });
    }

    await this.familyMemberRepository.delete({
      family: { id: familyId },
    });
    await this.familyRepository.delete(familyId);
  }

  //가족 정보 업데이트
  async updateFamily(updateFamilyDto: UpdateFamilyDto): Promise<void> {
    await this.validateFamily(updateFamilyDto.familyId);
    await this.familyRepository.save(updateFamilyDto);
  }

  async validateFamily(familyId: number) {
    const family = await this.familyRepository.findOne({
      where: { id: familyId },
    });
    if (!family) {
      throw new FamilyException(ResponseCode.FAMILY_NOT_FOUND);
    }
    return family;
  }
}
