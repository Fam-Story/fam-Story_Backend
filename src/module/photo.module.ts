import { Module } from '@nestjs/common';
import { PhotoController, PhotoService } from '../domain/photo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Family, Photo } from '../infra/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Family, Photo])],

  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotoModule {}
