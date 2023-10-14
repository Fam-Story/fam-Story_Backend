import { Injectable } from '@nestjs/common';
import { CreateFamilyScheduleDto } from '../dto/request/create-family-schedule.dto';
import { UpdateFamilyScheduleDto } from '../dto/request/update-family-schedule.dto';

@Injectable()
export class FamilyScheduleService {
  create(createFamilyScheduleDto: CreateFamilyScheduleDto) {
    return 'This action adds a new familySchedule';
  }

  findAll() {
    return `This action returns all familySchedule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} familySchedule`;
  }

  update(id: number, updateFamilyScheduleDto: UpdateFamilyScheduleDto) {
    return `This action updates a #${id} familySchedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} familySchedule`;
  }
}
