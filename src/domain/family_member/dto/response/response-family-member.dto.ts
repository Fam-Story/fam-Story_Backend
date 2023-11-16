import { ResponsePostDto } from '../../../post';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseFamilyMemberDto {
  @ApiProperty({ example: 1, description: '가족 멤버 고유 ID' })
  readonly familyMemberId: number;

  @ApiProperty({ example: 1, description: '가족 고유 ID' })
  readonly familyId: number;

  @ApiProperty({ example: 1, description: '유저 고유 ID' })
  readonly userId: number;

  @ApiProperty({
    example: 1,
    description: '가족 멤버의 역할, (1: 부, 2: 모, 3: 아들, 4: 딸)',
  })
  readonly role: number;

  @ApiProperty({ example: 1, description: '가족 멤버의 총 찌르기 횟수' })
  readonly pokeCount: number;

  @ApiProperty({ example: 1, description: '가족 멤버의 총 대화 횟수' })
  readonly talkCount: number;

  @ApiProperty({ example: 1, description: '가족 멤버에게 등록된 포스트' })
  readonly posts: ResponsePostDto[];

  private constructor(
    familyMemberId: number,
    familyId: number,
    userId: number,
    role: number,
    pokeCount: number,
    talkCount: number,
    posts: ResponsePostDto[],
  ) {
    this.familyMemberId = familyMemberId;
    this.familyId = familyId;
    this.userId = userId;
    this.role = role;
    this.pokeCount = pokeCount;
    this.talkCount = talkCount;
    this.posts = posts;
  }

  static of(
    familyMemberId: number,
    familyId: number,
    userId: number,
    role: number,
    pokeCount: number,
    talkCount: number,
    posts: ResponsePostDto[],
  ): ResponseFamilyMemberDto {
    return new ResponseFamilyMemberDto(
      familyMemberId,
      familyId,
      userId,
      role,
      pokeCount,
      talkCount,
      posts,
    );
  }
}
