import {IsDate, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateFamilyScheduleDto {
  @IsNumber()
  @IsNotEmpty()
  scheduleId: number;

  @IsString()
  @IsNotEmpty()
  scheduleName: string;

  @IsDate()
  @IsNotEmpty()
  scheduleDate: Date;

  @IsNumber()
  @IsNotEmpty()
  familyId: number;
}
