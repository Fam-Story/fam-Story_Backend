import { Module } from '@nestjs/common';
import {
  FamilyMemberController,
  FamilyMemberService,
} from '../domain/family_member';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Family, FamilyMember, User } from '../infra/entities';

@Module({
  imports: [TypeOrmModule.forFeature([FamilyMember, Family, User])],
  controllers: [FamilyMemberController],
  providers: [FamilyMemberService],
})
export class FamilyMemberModule {}
