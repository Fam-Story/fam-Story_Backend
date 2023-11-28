import { PartialType } from '@nestjs/mapped-types';
import { CreateFamilyMemberDto } from './create-family-member.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFamilyMemberDto extends PartialType(CreateFamilyMemberDto) {
  @ApiProperty({
    example: 1,
    description: '가족 멤버 고유 ID',
    nullable: false,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly familyMemberId: number;
}
