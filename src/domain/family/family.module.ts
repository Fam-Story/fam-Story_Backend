import { Module } from '@nestjs/common';
import {
  AlbumService,
  FamilyService,
  FamilyMemberService,
  FamilyScheduleService,
  IndividualScheduleService,
  PhotoService,
  PostService,
} from './service';
import {
  AlbumController,
  FamilyController,
  FamilyMemberController,
  FamilyScheduleController,
  IndividualScheduleController,
  PhotoController,
  PostController,
} from './controller';

@Module({
  controllers: [
    FamilyController,
    AlbumController,
    FamilyMemberController,
    FamilyScheduleController,
    IndividualScheduleController,
    PhotoController,
    PostController,
  ],
  providers: [
    FamilyService,
    AlbumService,
    FamilyMemberService,
    FamilyScheduleService,
    IndividualScheduleService,
    PhotoService,
    PostService,
  ],
})
export class FamilyModule {}
