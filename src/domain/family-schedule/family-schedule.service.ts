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
    familySchedule.scheduleDate = new Date(
      updateFamilyScheduleDto.scheduleYear,
      updateFamilyScheduleDto.scheduleMonth - 1,
      updateFamilyScheduleDto.scheduleDay,
    );
    familySchedule.scheduleName = updateFamilyScheduleDto.scheduleName;
    await this.familyScheduleRepository.save(familySchedule);
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
    startOfMonth: Date,
    endOfMonth: Date,
  ): Promise<ResponseFamilyScheduleDto[]> {
    const family = await this.validateFamily(familyId);

    const familySchedules: FamilySchedule[] =
      await this.familyScheduleRepository.find({
        where: {
          family: { id: family.id },
          scheduleDate: Between(startOfMonth, endOfMonth),
        },
        order: { scheduleDate: 'ASC' },
      });

    return familySchedules.map((familySchedule) => {
      return ResponseFamilyScheduleDto.from(familySchedule);
    });
  }

  async validateFamilySchedule(familyScheduleId: number) {
    const familySchedule = this.familyScheduleRepository.findOne({
      where: { id: familyScheduleId },
    });
    if (!familySchedule) {
      throw new FamilyScheduleException(ResponseCode.FAMILY_SCHEDULE_NOT_FOUND);
    }
    return familySchedule;
  }
  async validateFamily(familyId: number) {
    const family = this.familyRepository.findOne({
      where: { id: familyId },
    });
    if (!family) {
      throw new FamilyException(ResponseCode.FAMILY_NOT_FOUND);
    }
    return family;
  }
}
