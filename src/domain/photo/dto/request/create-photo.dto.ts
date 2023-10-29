import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePhotoDto {
  @IsNotEmpty()
  @IsString()
  readonly s3imageUrl: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsDate()
  readonly createdDate: Date;

  @IsNotEmpty()
  @IsNumber()
  readonly familyId: number;
}
