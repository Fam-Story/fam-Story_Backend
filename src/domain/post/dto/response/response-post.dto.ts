import { Post } from '../../../../infra/entities';
import { ApiProperty } from '@nestjs/swagger';

export class ResponsePostDto {
  @ApiProperty({ example: 1, description: '포스트의 고유 ID' })
  readonly postId: number;

  @ApiProperty({
    example: 1,
    description: '포스트를 작성한 가족 구성원의 고유 ID',
  })
  readonly familyMemberId: number;

  @ApiProperty({ example: '푸앙이', description: '포스트의 제목' })
  readonly title: string;

  @ApiProperty({ example: '푸앙이가 먹는 모습', description: '포스트의 내용' })
  readonly context: string;

  @ApiProperty({ example: '2021-10-10', description: '포스트가 작성된 날짜' })
  readonly createdDate: Date;

  private constructor(
    postId: number,
    familyMemberId: number,
    title: string,
    context: string,
    createdDate: Date,
  ) {
    this.postId = postId;
    this.familyMemberId = familyMemberId;
    this.title = title;
    this.context = context;
    this.createdDate = createdDate;
  }

  static of(
    postId: number,
    familyId: number,
    title: string,
    context: string,
    createdDate: Date,
  ): ResponsePostDto {
    return new ResponsePostDto(postId, familyId, title, context, createdDate);
  }

  static from(post: Post) {
    return ResponsePostDto.of(
      post.id,
      post.srcMember.id,
      post.title,
      post.context,
      post.createdDate,
    );
  }
}
