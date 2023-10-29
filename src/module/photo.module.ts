import { Module } from '@nestjs/common';
import { PhotoController } from '../domain/photo/photo.controller';
import { PhotoService } from '../domain/photo/photo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from '../infra/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Photo])],

  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotoModule {}
