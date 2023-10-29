import { Module } from '@nestjs/common';
import { FamilyMemberController } from '../domain/family-member/family-member.controller';
import { FamilyMemberService } from '../domain/family-member/family-member.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FamilyMember } from '../infra/entities';

@Module({
  imports: [TypeOrmModule.forFeature([FamilyMember])],

  controllers: [FamilyMemberController],
  providers: [FamilyMemberService],
})
export class FamilyMemberModule {}
