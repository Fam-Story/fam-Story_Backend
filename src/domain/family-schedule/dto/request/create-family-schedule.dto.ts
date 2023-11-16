import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFamilyScheduleDto {
  @IsNumber()
  @IsNotEmpty()
  scheduleId: number;

  @IsString()
  @IsNotEmpty()
  scheduleName: string;

  @IsNumber()
  @IsNotEmpty()
  scheduleYear: number;

  @IsNumber()
  @IsNotEmpty()
  scheduleMonth: number;

  @IsNumber()
  @IsNotEmpty()
  scheduleDay: number;

  @IsNumber()
  @IsNotEmpty()
  familyId: number;
}
