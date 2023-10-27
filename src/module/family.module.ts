import { Module } from '@nestjs/common';
import { FamilyService } from '../domain/family/family.service';
import { FamilyController } from '../domain/family/family.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Family } from '../infra/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Family])],

  controllers: [FamilyController],
  providers: [FamilyService],
})
export class FamilyModule {}
