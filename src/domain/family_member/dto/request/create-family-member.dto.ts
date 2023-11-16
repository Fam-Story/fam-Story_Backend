import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFamilyMemberDto {
  @ApiProperty({ example: 1, description: '유저 고유 ID' })
  @IsNotEmpty()
  @IsNumber()
  readonly userId: number;

  @ApiProperty({ example: 1, description: '가족 고유 ID' })
  @IsNotEmpty()
  @IsNumber()
  readonly familyId: number;

  @ApiProperty({
    example: 1,
    description: '가족 멤버의 역할, (1: 부, 2: 모, 3: 아들, 4: 딸)',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly role: number;
}
