import { FamilySchedule } from '../../../../infra/entities';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('가족 일정 응답 dto')
export class ResponseFamilyScheduleDto {
  @ApiProperty({ example: 1 })
  readonly familyId: number;
  @ApiProperty({ example: 1 })
  readonly scheduleId: number;
  @ApiProperty({ example: '푸앙이네 생일' })
  readonly scheduleName: string;
  @ApiProperty({ example: '2021' })
  readonly scheduleYear: number;
  @ApiProperty({ example: '8' })
  readonly scheduleMonth: number;
  @ApiProperty({ example: '1' })
  readonly scheduleDay: number;

  private constructor(
    familyId: number,
    scheduleId: number,
    scheduleName: string,
    scheduleDate: Date,
  ) {
    this.familyId = familyId;
    this.scheduleId = scheduleId;
    this.scheduleName = scheduleName;
    this.scheduleYear = scheduleDate.getFullYear();
    this.scheduleMonth = scheduleDate.getMonth() + 1;
    this.scheduleDay = scheduleDate.getDate();
  }

  static from(familySchedule: FamilySchedule): ResponseFamilyScheduleDto {
    return new ResponseFamilyScheduleDto(
      familySchedule.family.id,
      familySchedule.id,
      familySchedule.scheduleName,
      familySchedule.scheduleDate,
    );
  }
}
