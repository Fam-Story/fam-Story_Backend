import { Injectable } from '@nestjs/common';
import {
  CreateFamilyScheduleDto,
  ResponseFamilyScheduleDto,
  UpdateFamilyScheduleDto,
} from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Family, FamilySchedule } from '../../infra/entities';
import { Between, Repository } from 'typeorm';
import { FamilyException } from '../../common/exception/family.exception';
import { ResponseCode } from '../../common';
import { FamilyScheduleException } from '../../common/exception/family-schedule.exception';

@Injectable()
export class FamilyScheduleService {
  constructor(
    @InjectRepository(Family) private familyRepository: Repository<Family>,
    @InjectRepository(FamilySchedule)
    private familyScheduleRepository: Repository<FamilySchedule>,
  ) {}
  async createFamilySchedule(createFamilyScheduleDto: CreateFamilyScheduleDto) {
    const family = await this.validateFamily(createFamilyScheduleDto.familyId);
    const date: Date = new Date(
      createFamilyScheduleDto.scheduleYear,
      createFamilyScheduleDto.scheduleMonth - 1,
      createFamilyScheduleDto.scheduleDay,
    );
    const familySchedule = FamilySchedule.createFamilySchedule(
      createFamilyScheduleDto.scheduleName,
      date,
      family,
    );
    const savedFamilySchedule =
      await this.familyScheduleRepository.save(familySchedule);
    return savedFamilySchedule.id;
  }

  async updateFamilySchedule(updateFamilyScheduleDto: UpdateFamilyScheduleDto) {
    const familySchedule = await this.validateFamilySchedule(
      updateFamilyScheduleDto.familyScheduleId,
    );
    await this.validateFamily(updateFamilyScheduleDto.familyId);
    await this.familyScheduleRepository.update(
      { id: familySchedule.id },
      { ...updateFamilyScheduleDto },
    );
  }

  async deleteFamilySchedule(familyScheduleId: number) {
    await this.validateFamilySchedule(familyScheduleId);
    await this.familyScheduleRepository.delete(familyScheduleId);
  }

  async findFamilyScheduleById(familyScheduleId: number) {
    const familySchedule = await this.validateFamilySchedule(familyScheduleId);
    return ResponseFamilyScheduleDto.from(familySchedule);
  }

  async findFamilyScheduleList(
    familyId: number,
    year: number,
    targetMonth: number,
  ): Promise<ResponseFamilyScheduleDto[]> {
    await this.validateFamily(familyId);
    const startOfMonthDate = new Date(year, targetMonth - 1, 1);
    const endOfMonthDate = new Date(year, targetMonth, 0);

    const familySchedules: FamilySchedule[] =
      await this.familyScheduleRepository.find({
        where: {
          family: { id: familyId },
          scheduleDate: Between(startOfMonthDate, endOfMonthDate),
        },
        order: { scheduleDate: 'ASC' },
      });

    familySchedules.forEach((schedule) => {
      schedule.scheduleDate = new Date(schedule.scheduleDate);
    });

    return familySchedules.map((familySchedule) => {
      return ResponseFamilyScheduleDto.from(familySchedule);
    });
  }

  async validateFamilySchedule(familyScheduleId: number) {
    const familySchedule = await this.familyScheduleRepository.findOne({
      where: { id: familyScheduleId },
    });
    if (!familySchedule) {
      throw new FamilyScheduleException(ResponseCode.FAMILY_SCHEDULE_NOT_FOUND);
    }
    return familySchedule;
  }
  async validateFamily(familyId: number) {
    const family = await this.familyRepository.findOne({
      where: { id: familyId },
    });
    if (!family) {
      throw new FamilyException(ResponseCode.FAMILY_NOT_FOUND);
    }
    return family;
  }
}
