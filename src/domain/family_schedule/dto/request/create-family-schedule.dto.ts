import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFamilyScheduleDto {
  @ApiProperty({
    example: '푸앙이네 가족 일정',
    description: '일정 이름',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  scheduleName: string;

  @ApiProperty({ example: 2023, description: '일정 년도', nullable: false })
  @IsNumber()
  @IsNotEmpty()
  scheduleYear: number;

  @ApiProperty({ example: 12, description: '일정 월', nullable: false })
  @IsNumber()
  @IsNotEmpty()
  scheduleMonth: number;

  @ApiProperty({ example: 5, description: '일정 일', nullable: false })
  @IsNumber()
  @IsNotEmpty()
  scheduleDay: number;

  @ApiProperty({ example: 1, description: '가족 고유 ID', nullable: false })
  @IsNumber()
  @IsNotEmpty()
  familyId: number;
}
