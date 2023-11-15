import { Module } from '@nestjs/common';
import { PhotoController } from '../domain/photo/photo.controller';
import { PhotoService } from '../domain/photo/photo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Family, Photo } from '../infra/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Family, Photo])],

  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotoModule {}
