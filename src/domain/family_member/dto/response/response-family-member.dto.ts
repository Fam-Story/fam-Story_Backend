import { ApiProperty } from '@nestjs/swagger';
import { FamilyMember } from '../../../../infra/entities';

export class ResponseFamilyMemberDto {
  @ApiProperty({ example: 1, description: '가족 멤버 고유 ID' })
  readonly familyMemberId: number;

  @ApiProperty({ example: '김철수', description: '가족 멤버의 이름' })
  readonly name: string;

  @ApiProperty({ example: '푸앙', description: '가족 멤버의 별명' })
  readonly nickname: string;

  @ApiProperty({
    example: 1,
    description: '가족 멤버의 역할, (1: 부, 2: 모, 3: 아들, 4: 딸)',
  })
  readonly role: number;

  @ApiProperty({ example: 1, description: '가족 멤버의 총 찌르기 횟수' })
  readonly pokeCount: number;

  @ApiProperty({ example: 1, description: '가족 멤버의 총 대화 횟수' })
  readonly talkCount: number;

  private constructor(
    familyMemberId: number,
    name: string,
    nickname: string,
    role: number,
    pokeCount: number,
    talkCount: number,
  ) {
    this.familyMemberId = familyMemberId;
    this.name = name;
    this.nickname = nickname;
    this.role = role;
    this.pokeCount = pokeCount;
    this.talkCount = talkCount;
  }

  static of(
    familyMemberId: number,
    familyId: number,
    name: string,
    nickname: string,
    role: number,
    pokeCount: number,
    talkCount: number,
  ): ResponseFamilyMemberDto {
    return new ResponseFamilyMemberDto(
      familyMemberId,
      name,
      nickname,
      role,
      pokeCount,
      talkCount,
    );
  }

  static from(familyMember: FamilyMember): ResponseFamilyMemberDto {
    return new ResponseFamilyMemberDto(
      familyMember.id,
      familyMember.user.username,
      familyMember.user.nickname,
      familyMember.role,
      familyMember.pokeCount,
      familyMember.talkCount,
    );
  }
}
