import { PartialType } from '@nestjs/mapped-types';
import { CreateFamilyScheduleDto } from './create-family-schedule.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFamilyScheduleDto extends PartialType(
  CreateFamilyScheduleDto,
) {
  @ApiProperty({
    example: 1,
    description: '가족 일정 고유 ID',
    nullable: false,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly familyScheduleId: number;
}
