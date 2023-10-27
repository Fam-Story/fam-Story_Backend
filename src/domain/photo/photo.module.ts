import { Module } from '@nestjs/common';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from '../../infra/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Photo])],

  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotoModule {}
