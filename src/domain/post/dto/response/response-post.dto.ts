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

  @ApiProperty({ example: 2021, description: '포스트가 작성된 날짜의 연도' })
  readonly createdYear: number;

  @ApiProperty({ example: 10, description: '포스트가 작성된 날짜의 월' })
  readonly createdMonth: number;

  @ApiProperty({ example: 1, description: '포스트가 작성된 날짜의 일' })
  readonly createdDay: number;

  @ApiProperty({ example: 20, description: '포스트가 작성된 날짜의 시' })
  readonly createdHour: number;

  @ApiProperty({ example: 5, description: '포스트가 작성된 날짜의 분' })
  readonly createdMinute: number;

  @ApiProperty({
    example: 1,
    description: '포스트를 작성한 가족 구성원의 가족 고유 ID',
  })
  readonly familyId: number;

  private constructor(
    postId: number,
    familyMemberId: number,
    title: string,
    context: string,
    createdYear: number,
    createdMonth: number,
    createdDay: number,
    createdHour: number,
    createdMinute: number,
    familyId: number,
  ) {
    this.postId = postId;
    this.familyMemberId = familyMemberId;
    this.title = title;
    this.context = context;
    this.createdYear = createdYear;
    this.createdMonth = createdMonth;
    this.createdDay = createdDay;
    this.createdHour = createdHour;
    this.createdMinute = createdMinute;
    this.familyId = familyId;
  }

  static of(
    postId: number,
    familyMemberId: number,
    title: string,
    context: string,
    createdYear: number,
    createdMonth: number,
    createdDay: number,
    createdHour: number,
    createdMinute: number,
    familyId: number,
  ): ResponsePostDto {
    return new ResponsePostDto(
      postId,
      familyMemberId,
      title,
      context,
      createdYear,
      createdMonth,
      createdDay,
      createdHour,
      createdMinute,
      familyId,
    );
  }

  static from(post: Post) {
    return ResponsePostDto.of(
      post.id,
      post.srcMember.id,
      post.title,
      post.context,
      post.createdDate.getFullYear(),
      post.createdDate.getMonth(),
      post.createdDate.getDate(),
      post.createdDate.getHours(),
      post.createdDate.getMinutes(),
      post.family.id,
    );
  }
}
