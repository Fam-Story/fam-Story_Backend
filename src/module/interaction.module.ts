import { Module } from '@nestjs/common';
import {
  InteractionController,
  InteractionService,
} from '../domain/interaction';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FamilyMember, Interaction } from '../infra/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Interaction, FamilyMember])],
  controllers: [InteractionController],
  providers: [InteractionService],
})
export class InteractionModule {}
