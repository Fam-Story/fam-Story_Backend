import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePhotoDto {
  @ApiProperty({
    example: 'https://s3.bucket.com/image1.jpg',
    description: '사진의 S3 URL',
  })
  @IsNotEmpty()
  @IsString()
  readonly s3imageUrl: string;

  @ApiProperty({ example: '푸앙이', description: '사진의 이름' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: '2021-10-10', description: '사진이 생성된 날짜' })
  @IsNotEmpty()
  @IsDate()
  readonly createdDate: Date;

  @ApiProperty({ example: 1, description: '사진을 소유한 가족의 고유 ID' })
  @IsNotEmpty()
  @IsNumber()
  readonly familyId: number;
}
