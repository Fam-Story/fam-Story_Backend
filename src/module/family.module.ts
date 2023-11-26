import { Module } from '@nestjs/common';
import { FamilyController, FamilyService } from '../domain/family';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Family, FamilyMember, User } from '../infra/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Family, FamilyMember, User])],

  controllers: [FamilyController],
  providers: [FamilyService],
})
export class FamilyModule {}
