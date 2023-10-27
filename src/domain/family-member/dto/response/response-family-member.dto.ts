import { Post } from 'src/infra/entities';

export class ResponseFamilyMemberDto {
  familyMemberId: number;
  familyId: number;
  userId: number;

  role: number;
  pokeCount: number;
  talkCount: number;

  posts: Post[];
}
