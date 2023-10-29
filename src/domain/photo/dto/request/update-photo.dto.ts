import { PartialType } from '@nestjs/mapped-types';
import { CreatePhotoDto } from './create-photo.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdatePhotoDto extends PartialType(CreatePhotoDto) {
  @IsNotEmpty()
  @IsNumber()
  photoId: number;
}
