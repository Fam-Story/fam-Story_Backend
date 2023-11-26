import { Module } from '@nestjs/common';
import {
  InteractionController,
  InteractionService,
} from '../domain/interaction';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FamilyMember, Interaction } from '../infra/entities';
import { FirebaseCloudMessagingHandler } from '../common/util/fcm-handler';

@Module({
  imports: [TypeOrmModule.forFeature([Interaction, FamilyMember])],
  controllers: [InteractionController],
  providers: [InteractionService, FirebaseCloudMessagingHandler],
})
export class InteractionModule {}
