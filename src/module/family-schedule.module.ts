import { Module } from '@nestjs/common';
import { FamilyScheduleController } from '../domain/family-schedule/family-schedule.controller';
import { FamilyScheduleService } from '../domain/family-schedule/family-schedule.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FamilySchedule } from '../infra/entities';

@Module({
  imports: [TypeOrmModule.forFeature([FamilySchedule])],

  controllers: [FamilyScheduleController],
  providers: [FamilyScheduleService],
})
export class FamilyScheduleModule {}
