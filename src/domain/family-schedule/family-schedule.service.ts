import { Injectable } from '@nestjs/common';
import { CreateFamilyScheduleDto, UpdateFamilyScheduleDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Family, FamilySchedule } from '../../infra/entities';
import { Repository } from 'typeorm';
import { FamilyException } from '../../common/exception/family.exception';
import { ResponseCode } from '../../common';

@Injectable()
export class FamilyScheduleService {
  constructor(
    @InjectRepository(Family) private familyRepository: Repository<Family>,
    @InjectRepository(FamilySchedule)
    private familyScheduleRepository: Repository<FamilySchedule>,
  ) {}
  async createFamilySchedule(createFamilyScheduleDto: CreateFamilyScheduleDto) {
    const family = await this.validateFamily(createFamilyScheduleDto.familyId);
    const familySchedule = FamilySchedule.createFamilySchedule(
      createFamilyScheduleDto.scheduleName,
      createFamilyScheduleDto.scheduleDate,
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
    familySchedule.scheduleDate = updateFamilyScheduleDto.scheduleDate;
    familySchedule.scheduleName = updateFamilyScheduleDto.scheduleName;
    await this.familyScheduleRepository.save(familySchedule);
  }

  async deleteFamilySchedule(familyScheduleId: number) {
    await this.validateFamilySchedule(familyScheduleId);
    await this.familyScheduleRepository.delete(familyScheduleId);
  }

  async validateFamilySchedule(familyScheduleId: number) {
    const familySchedule = this.familyScheduleRepository.findOne({
      where: { id: familyScheduleId },
    });
    if (!familySchedule) {
      throw new FamilyException(ResponseCode.FAMILY_SCHEDULE_NOT_FOUND);
    }
    return familySchedule;
  }
  async validateFamily(famliyId: number) {
    const family = this.familyRepository.findOne({
      where: { id: famliyId },
    });
    if (!family) {
      throw new FamilyException(ResponseCode.FAMILY_NOT_FOUND);
    }
    return family;
  }
}
