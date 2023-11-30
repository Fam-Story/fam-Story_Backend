import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    example: 1,
    description: '포스트를 작성한 가족 구성원의 고유 ID',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly srcMemberId: number;

  @ApiProperty({ example: 1, description: '포스트를 작성한 가족의 고유 ID' })
  @IsNotEmpty()
  @IsNumber()
  readonly familyId: number;

  @ApiProperty({ example: '푸앙이', description: '포스트의 제목' })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({ example: '푸앙이가 먹는 모습', description: '포스트의 내용' })
  @IsNotEmpty()
  @IsString()
  readonly context: string;

  @ApiProperty({ example: 2021, description: '포스트가 작성된 날짜의 연도' })
  @IsNotEmpty()
  @IsNumber()
  readonly createdYear: number;

  @ApiProperty({ example: 10, description: '포스트가 작성된 날짜의 월' })
  @IsNotEmpty()
  @IsNumber()
  readonly createdMonth: number;

  @ApiProperty({ example: 1, description: '포스트가 작성된 날짜의 일' })
  @IsNotEmpty()
  @IsNumber()
  readonly createdDay: number;

  @ApiProperty({ example: 20, description: '포스트가 작성된 날짜의 시' })
  @IsNotEmpty()
  @IsNumber()
  readonly createdHour: number;

  @ApiProperty({ example: 5, description: '포스트가 작성된 날짜의 분' })
  @IsNotEmpty()
  @IsNumber()
  readonly createdMinute: number;
}
