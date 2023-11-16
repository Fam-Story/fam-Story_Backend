import { PartialType } from '@nestjs/mapped-types';
import { CreateFamilyDto } from './create-family.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFamilyDto extends PartialType(CreateFamilyDto) {
  @ApiProperty({ example: 1, description: '가족 ID', nullable: false })
  @IsNotEmpty()
  @IsNumber()
  familyId: number;
}
