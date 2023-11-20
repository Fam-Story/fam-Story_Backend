import { PartialType } from '@nestjs/mapped-types';
import { CreatePhotoDto } from './create-photo.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePhotoDto extends PartialType(CreatePhotoDto) {
  @ApiProperty({ example: 1, description: '사진의 고유 ID' })
  @IsNotEmpty()
  @IsNumber()
  photoId: number;
}
