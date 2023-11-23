import { Module } from '@nestjs/common';
import { FamilyController, FamilyService } from '../domain/family';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Family } from '../infra/entities';
import { FamilyMemberService } from '../domain/family_member';

@Module({
  imports: [TypeOrmModule.forFeature([Family])],

  controllers: [FamilyController],
  providers: [FamilyService, FamilyMemberService],
})
export class FamilyModule {}
