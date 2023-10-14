import { Injectable } from '@nestjs/common';
import { CreateIndividualScheduleDto } from '../dto/request/create-individual-schedule.dto';
import { UpdateIndividualScheduleDto } from '../dto/request/update-individual-schedule.dto';

@Injectable()
export class IndividualScheduleService {
  create(createIndividualScheduleDto: CreateIndividualScheduleDto) {
    return 'This action adds a new individualSchedule';
  }

  findAll() {
    return `This action returns all individualSchedule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} individualSchedule`;
  }

  update(id: number, updateIndividualScheduleDto: UpdateIndividualScheduleDto) {
    return `This action updates a #${id} individualSchedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} individualSchedule`;
  }
}