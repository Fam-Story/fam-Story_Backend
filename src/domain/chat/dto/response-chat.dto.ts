import { ApiProperty } from '@nestjs/swagger';

export class ResponseChatDto {
  @ApiProperty({
    example: '1',
    description: '가족 구성원 ID',
  })
  familyMemberId: string;
  @ApiProperty({
    example: '푸앙이',
    description: '가족 구성원 별명',
  })
  nickname: string;
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
  @ApiProperty({
    example: '12:00',
    description: '채팅 생성 시간',
  })
  createdTime: string;
}
