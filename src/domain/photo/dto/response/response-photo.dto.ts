import { Photo } from '../../../../infra/entities';
import { ApiProperty } from '@nestjs/swagger';

export class ResponsePhotoDto {
  @ApiProperty({ example: 1, description: '사진 ID' })
  readonly photoId: number;

  @ApiProperty({ example: '푸앙이의 사진', description: '사진 이름' })
  readonly photoName: string;

  @ApiProperty({ example: 'http://s3.com/puang.jpg', description: '사진 URL' })
  readonly photoUrl: string;

  @ApiProperty({ example: '2021-01-01', description: '사진 생성 날짜' })
  readonly createdDate: Date;

  constructor(
    photoId: number,
    photoName: string,
    photoUrl: string,
    createdDate: Date,
  ) {
    this.photoId = photoId;
    this.photoName = photoName;
    this.photoUrl = photoUrl;
    this.createdDate = createdDate;
  }
  static of(
    photoId: number,
    photoName: string,
    photoUrl: string,
    createdDate: Date,
  ): ResponsePhotoDto {
    return new ResponsePhotoDto(photoId, photoName, photoUrl, createdDate);
  }

  static from(photo: Photo): ResponsePhotoDto {
    return new ResponsePhotoDto(
      photo.id,
      photo.name,
      photo.s3ImageUrl,
      photo.createdDate,
    );
  }
}
