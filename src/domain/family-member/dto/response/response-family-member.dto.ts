import { Post } from 'src/infra/entities';

export class ResponseFamilyMemberDto {
  familyMemberId: number;
  familyId: number;
  userId: number;

  role: number;
  pokeCount: number;
  talkCount: number;

  posts: Post[];

  private constructor(
    familyMemberId: number,
    familyId: number,
    userId: number,
    role: number,
    pokeCount: number,
    talkCount: number,
    posts: Post[],
  ) {
    this.familyMemberId = familyMemberId;
    this.familyId = familyId;
    this.userId = userId;
    this.role = role;
    this.pokeCount = pokeCount;
    this.talkCount = talkCount;
    this.posts = posts;
  }
}
