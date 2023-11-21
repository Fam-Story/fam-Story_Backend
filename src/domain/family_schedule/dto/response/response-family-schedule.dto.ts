import { FamilySchedule } from '../../../../infra/entities';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('가족 일정 응답 dto')
export class ResponseFamilyScheduleDto {
  @ApiProperty({ example: 1, description: '가족 일정 ID' })
  readonly scheduleId: number;
  @ApiProperty({ example: '푸앙이네 생일', description: '가족 일정 이름' })
  readonly scheduleName: string;
  @ApiProperty({ example: '2021', description: '가족 일정 년도' })
  readonly scheduleYear: number;
  @ApiProperty({ example: '8', description: '가족 일정 월' })
  readonly scheduleMonth: number;
  @ApiProperty({ example: '1', description: '가족 일정 일' })
  readonly scheduleDay: number;

  private constructor(
    scheduleId: number,
    scheduleName: string,
    scheduleDate: Date,
  ) {
    this.scheduleId = scheduleId;
    this.scheduleName = scheduleName;
    this.scheduleYear = scheduleDate.getFullYear();
    this.scheduleMonth = scheduleDate.getMonth() + 1;
    this.scheduleDay = scheduleDate.getDate(); //일자
  }

  static from(familySchedule: FamilySchedule): ResponseFamilyScheduleDto {
    return new ResponseFamilyScheduleDto(
      familySchedule.id,
      familySchedule.scheduleName,
      familySchedule.scheduleDate,
    );
  }
}
