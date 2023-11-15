import { FamilySchedule } from '../../../../infra/entities';

export class ResponseFamilyScheduleDto {
  familyId: number;
  scheduleId: number;
  scheduleName: string;
  scheduleDate: Date;

  private constructor(
    familyId: number,
    scheduleId: number,
    scheduleName: string,
    scheduleDate: Date,
  ) {
    this.familyId = familyId;
    this.scheduleId = scheduleId;
    this.scheduleName = scheduleName;
    this.scheduleDate = scheduleDate;
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
