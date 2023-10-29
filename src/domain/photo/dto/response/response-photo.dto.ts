export class ResponsePhotoDto {
  readonly photoId: number;
  readonly photoName: string;
  readonly photoUrl: string;
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
}
