import { ApiProperty } from '@nestjs/swagger';

export class ResponseChatDto {
  @ApiProperty({
    example: '김철수',
    description: '가족 구성원 이름',
  })
  familyMemberName: string;
  @ApiProperty({
    example: 1,
    description: '가족 구성원 역할',
  })
  role: number;
  @ApiProperty({
    example: '안녕하세요',
    description: '채팅 내용',
  })
  message: string;
}
