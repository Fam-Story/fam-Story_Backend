import { Injectable } from '@nestjs/common';
import {
  CreateFamilyMemberDto,
  ResponseFamilyMemberDto,
  UpdateFamilyMemberDto,
} from './dto';
import { Family, FamilyMember, User } from '../../infra/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseCode } from '../../common';
import { UserException } from '../../common/exception/user.exception';
import { ResponseFamilyDto } from '../family';
import { FamilyMemberException } from '../../common/exception/family-member.exception';
import { FamilyException } from '../../common/exception/family.exception';
import { GetFamilyInfoDto } from './dto/request/get-family-info.dto';

@Injectable()
export class FamilyMemberService {
  constructor(
    @InjectRepository(FamilyMember)
    private familyMemberRepository: Repository<FamilyMember>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Family) private familyRepository: Repository<Family>,
  ) {}
  async createFamilyMember(
    userId: number,
    createFamilyMemberDto: CreateFamilyMemberDto,
  ): Promise<number> {
    const user = await this.validateUser(userId);
    // 이미 가족에 속해있는 경우 오류 발생
    if (user.belongsToFamily) {
      throw new FamilyMemberException(ResponseCode.FAMILY_MEMBER_ALREADY_EXIST);
    }
    const family = await this.validateFamily(createFamilyMemberDto.familyId);

    if (family.memberNumber >= 5) {
      throw new FamilyMemberException(ResponseCode.FAMILY_FULL);
    }

    const familyMember: FamilyMember = FamilyMember.createFamilyMember(
      createFamilyMemberDto.role,
      family,
      user,
      createFamilyMemberDto.fcmToken,
      createFamilyMemberDto.introMessage,
    );
    const savedMember = await this.familyMemberRepository.save(familyMember);
    family.memberNumber += 1;
    // 가족에 속해 있다고 지정
    await this.userRepository.update(user.id, {
      belongsToFamily: true,
    });
    // 가족 구성원 수 증가
    await this.familyRepository.update(family.id, {
      memberNumber: () => 'Member_Number + 1',
    });
    return savedMember.id;
  }

  async updateFamilyMember(
    updateFamilyMemberDto: UpdateFamilyMemberDto,
  ): Promise<void> {
    const familyMember = await this.validateFamilyMember(
      updateFamilyMemberDto.id,
    );
    await this.familyMemberRepository.update(
      { id: familyMember.id },
      { ...updateFamilyMemberDto },
    );
  }

  async deleteFamilyMember(familyMemberId: number) {
    const familyMember = await this.familyMemberRepository.findOne({
      where: { id: familyMemberId },
      relations: ['family', 'user'],
    });
    if (!familyMember) {
      throw new FamilyMemberException(ResponseCode.FAMILY_MEMBER_NOT_FOUND);
    }
    const family = await this.validateFamily(familyMember.family.id);
    const user = await this.validateUser(familyMember.user.id);

    await this.familyMemberRepository.delete(familyMemberId);
    await this.userRepository.update(user.id, {
      belongsToFamily: false,
    });
    await this.familyRepository.update(family.id, {
      memberNumber: () => 'Member_Number - 1',
    });
  }

  //유저 ID를 통한 가족 구성원 정보 반환
  async findFamilyMemberByUserId(
    userId: number,
  ): Promise<ResponseFamilyMemberDto> {
    await this.validateUser(userId);
    const familyMember = await this.familyMemberRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    if (!familyMember) {
      throw new FamilyMemberException(ResponseCode.FAMILY_MEMBER_NOT_FOUND);
    }
    return ResponseFamilyMemberDto.from(familyMember);
  }

  //가족 구성원 ID를 통한 가족 구성원 정보 반환
  async findFamilyMemberByMemberId(
    familyMemberId: number,
  ): Promise<ResponseFamilyMemberDto> {
    const familyMember = await this.familyMemberRepository.findOne({
      where: { id: familyMemberId },
      relations: ['user'],
    });
    if (!familyMember) {
      throw new FamilyMemberException(ResponseCode.FAMILY_MEMBER_NOT_FOUND);
    }
    return ResponseFamilyMemberDto.from(familyMember);
  }

  //가족 구성원 ID를 통한 가족 정보 반환
  async findFamilyByMemberId(
    getFamilyInfoDto: GetFamilyInfoDto,
  ): Promise<ResponseFamilyDto> {
    const familyMember = await this.familyMemberRepository.findOne({
      where: { id: getFamilyInfoDto.familyMemberId },
      relations: ['family'], // Family 테이블과 Join
    });

    if (!familyMember) {
      throw new FamilyMemberException(ResponseCode.FAMILY_MEMBER_NOT_FOUND);
    }

    // 가족 구성원의 FCM 토큰 업데이트
    await this.familyMemberRepository.update(familyMember.id, {
      fcmToken: getFamilyInfoDto.fcmToken,
    });

    return ResponseFamilyDto.from(familyMember.family);
  }

  //가족 ID를 통한 모든 가족 구성원 정보 반환
  async findAllFamilyMemberByFamilyId(
    familyId: number,
  ): Promise<ResponseFamilyMemberDto[]> {
    await this.validateFamily(familyId);
    const familyMembers = await this.familyMemberRepository.find({
      where: { family: { id: familyId } },
      relations: ['user'],
    });
    return familyMembers.map((familyMember) =>
      ResponseFamilyMemberDto.from(familyMember),
    );
  }

  async validateUser(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new UserException(ResponseCode.USER_NOT_FOUND);
    }
    return user;
  }

  async validateFamily(familyId: number): Promise<Family> {
    const family = await this.familyRepository.findOne({
      where: { id: familyId },
    });
    if (!family) {
      throw new FamilyException(ResponseCode.FAMILY_NOT_FOUND);
    }
    return family;
  }

  async validateFamilyMember(familyMemberId: number): Promise<FamilyMember> {
    const familyMember = await this.familyMemberRepository.findOne({
      where: { id: familyMemberId },
    });
    if (!familyMember) {
      throw new FamilyMemberException(ResponseCode.FAMILY_MEMBER_NOT_FOUND);
    }
    return familyMember;
  }
}
