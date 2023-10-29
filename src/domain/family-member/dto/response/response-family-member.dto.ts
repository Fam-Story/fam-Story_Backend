import { ResponsePostDto } from '../../../post';

export class ResponseFamilyMemberDto {
  readonly familyMemberId: number;
  readonly familyId: number;
  readonly userId: number;

  readonly role: number;
  readonly pokeCount: number;
  readonly talkCount: number;

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
