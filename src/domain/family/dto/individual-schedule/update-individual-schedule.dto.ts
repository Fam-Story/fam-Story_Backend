import { PartialType } from '@nestjs/mapped-types';
import { CreateIndividualScheduleDto } from './create-individual-schedule.dto';

export class UpdateIndividualScheduleDto extends PartialType(
  CreateIndividualScheduleDto,
) {}
