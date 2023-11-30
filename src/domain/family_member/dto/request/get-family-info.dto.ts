import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetFamilyInfoDto {
  @ApiProperty({ example: 1, description: '가족 고유 ID', nullable: false })
  @IsNotEmpty()
  @IsNumber()
  readonly familyMemberId: number;

  @ApiProperty({
    example: 'ausdifh.daifu0wierj',
    description: '가족 멤버의 FCM 토큰',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  readonly fcmToken: string;
}
