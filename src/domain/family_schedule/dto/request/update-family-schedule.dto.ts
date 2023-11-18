import { PartialType } from '@nestjs/mapped-types';
import { CreateFamilyScheduleDto } from './create-family-schedule.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
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

  @ApiProperty({
    example: '푸앙이네 가족 일정',
    description: '일정 이름',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  readonly scheduleName: string;

  @ApiProperty({ example: 2, description: '가족 고유 ID', nullable: false })
  @IsNotEmpty()
  @IsNumber()
  readonly familyId: number;

  @ApiProperty({ example: 2023, description: '일정 년도', nullable: false })
  @IsNotEmpty()
  @IsNumber()
  readonly scheduleYear: number;

  @ApiProperty({ example: 12, description: '일정 월', nullable: false })
  @IsNotEmpty()
  @IsNumber()
  readonly scheduleMonth: number;

  @ApiProperty({ example: 5, description: '일정 일', nullable: false })
  @IsNotEmpty()
  @IsNumber()
  readonly scheduleDay: number;
}
