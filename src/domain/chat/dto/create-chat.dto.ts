import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class CreateChatDto {
  @ApiProperty({
    example: '1',
    description: '가족 ID',
  })
  @IsNumberString()
  readonly familyId: string;

  @ApiProperty({
    example: '1',
    description: '가족 구성원 ID',
  })
  @IsNumberString()
  readonly familyMemberId: string;

  @ApiProperty({
    example: '안녕하세요',
    description: '채팅 내용',
  })
  readonly message: string;

  @ApiProperty({
    example: '1',
    description: '가족 구성원 역할',
  })
  readonly role: string;
}
