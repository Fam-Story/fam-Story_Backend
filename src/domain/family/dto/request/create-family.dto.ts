import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFamilyDto {
  @ApiProperty({
    example: '푸앙이네 가족',
    description: '가족 이름',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  familyName: string;
}
