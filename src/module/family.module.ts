import { Module } from '@nestjs/common';
import { FamilyController, FamilyService } from '../domain/family';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Family, FamilyMember, User} from '../infra/entities';
import { FamilyMemberService } from '../domain/family_member';

@Module({
  imports: [TypeOrmModule.forFeature([Family, FamilyMember, User])],

  controllers: [FamilyController],
  providers: [FamilyService],
})
export class FamilyModule {}
