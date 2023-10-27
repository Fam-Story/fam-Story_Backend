import { Module } from '@nestjs/common';
import { FamilyScheduleController } from './family-schedule.controller';
import { FamilyScheduleService } from './family-schedule.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FamilySchedule } from '../../infra/entities';

@Module({
  imports: [TypeOrmModule.forFeature([FamilySchedule])],

  controllers: [FamilyScheduleController],
  providers: [FamilyScheduleService],
})
export class FamilyScheduleModule {}
