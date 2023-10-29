import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsNumber()
  readonly familyId: number;

  @IsNotEmpty()
  @IsString()
  readonly s3ImageUrl: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly createdDate: Date;
}
