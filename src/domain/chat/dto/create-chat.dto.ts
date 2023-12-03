import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
  @ApiProperty({
    example: '1',
    description: '가족 ID',
  })
  readonly familyId: string;
  @ApiProperty({
    example: '1',
    description: '가족 구성원 ID',
  })
  readonly familyMemberId: string;
  @ApiProperty({
    example: '안녕하세요',
    description: '채팅 내용',
  })
  readonly message: string;
}
