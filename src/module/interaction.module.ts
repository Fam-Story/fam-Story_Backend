import { Module } from '@nestjs/common';
import { InteractionService } from '../domain/interaction/interaction.service';
import { InteractionController } from '../domain/interaction/interaction.controller';

@Module({
  controllers: [InteractionController],
  providers: [InteractionService],
})
export class InteractionModule {}
