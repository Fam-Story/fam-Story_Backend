import { Module } from '@nestjs/common';
import { InteractionService } from '../domain/interaction/interaction.service';
import { InteractionController } from '../domain/interaction/interaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {FamilyMember, Interaction} from '../infra/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Interaction, FamilyMember])],
  controllers: [InteractionController],
  providers: [InteractionService],
})
export class InteractionModule {}
