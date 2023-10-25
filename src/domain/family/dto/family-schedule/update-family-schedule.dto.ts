import { PartialType } from '@nestjs/mapped-types';
import { CreateFamilyScheduleDto } from './create-family-schedule.dto';

export class UpdateFamilyScheduleDto extends PartialType(
  CreateFamilyScheduleDto,
) {}
