import { Module } from '@nestjs/common';
import { FamilyController, FamilyService } from '../domain/family';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Family } from '../infra/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Family])],

  controllers: [FamilyController],
  providers: [FamilyService],
})
export class FamilyModule {}
