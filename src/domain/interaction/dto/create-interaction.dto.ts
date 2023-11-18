import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInteractionDto {
  @ApiProperty({
    example: 1,
    nullable: false,
    description: '상호작용을 보내는 유저 ID',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly srcMemberId: number;

  @ApiProperty({
    example: 2,
    nullable: false,
    description: '상호작용을 받는 유저 ID',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly dstMemberId: number;

  @ApiProperty({ example: 1, nullable: false, description: '상호작용 타입' })
  @IsNotEmpty()
  @IsNumber()
  interactionType: number;
}
