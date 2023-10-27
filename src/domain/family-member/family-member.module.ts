import { Module } from '@nestjs/common';
import { FamilyMemberController } from './family-member.controller';
import { FamilyMemberService } from './family-member.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FamilyMember } from '../../infra/entities';

@Module({
  imports: [TypeOrmModule.forFeature([FamilyMember])],

  controllers: [FamilyMemberController],
  providers: [FamilyMemberService],
})
export class FamilyMemberModule {}
