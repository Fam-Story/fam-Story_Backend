import { Module } from '@nestjs/common';
import {
  FamilyScheduleController,
  FamilyScheduleService,
} from '../domain/family-schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Family, FamilySchedule } from '../infra/entities';

@Module({
  imports: [TypeOrmModule.forFeature([FamilySchedule, Family])],

  controllers: [FamilyScheduleController],
  providers: [FamilyScheduleService],
})
export class FamilyScheduleModule {}
