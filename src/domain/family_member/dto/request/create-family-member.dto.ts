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
  })
  @IsNotEmpty()
  @IsString()
  readonly fcmToken: string;
}
