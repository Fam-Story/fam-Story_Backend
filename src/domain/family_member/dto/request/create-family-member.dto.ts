import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFamilyMemberDto {
  @ApiProperty({ example: 1, description: '가족 고유 ID', nullable: false })
  @IsNotEmpty()
  @IsNumber()
  readonly familyId: number;

  @ApiProperty({
    example: 1,
    description: '가족 멤버의 역할, (1: 부, 2: 모, 3: 아들, 4: 딸)',
    nullable: false,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly role: number;

  @ApiProperty({
    example: 1,
    description: '가족 멤버의 FCM 토큰',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  readonly fcmToken: string;

  @ApiProperty({
    example: '안녕안녕',
    description: '가족 멤버의 상태 메시지',
    nullable: true,
  })
  @IsString()
  readonly introMessage: string;
}
