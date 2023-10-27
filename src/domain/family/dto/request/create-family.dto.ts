import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFamilyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  @IsString()
  memberNumber: number;

  @IsNotEmpty()
  @IsString()
  familyName: string;

  @IsNotEmpty()
  @IsDate()
  createdDate: Date;
}
