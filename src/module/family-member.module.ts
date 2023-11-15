import { Module } from '@nestjs/common';
import { FamilyMemberController } from '../domain/family-member/family-member.controller';
import { FamilyMemberService } from '../domain/family-member/family-member.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Family, FamilyMember, User } from '../infra/entities';

@Module({
  imports: [TypeOrmModule.forFeature([FamilyMember, Family, User])],
  controllers: [FamilyMemberController],
  providers: [FamilyMemberService],
})
export class FamilyMemberModule {}
