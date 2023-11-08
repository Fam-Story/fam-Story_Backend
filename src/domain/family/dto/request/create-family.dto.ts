import {IsNotEmpty, IsString } from 'class-validator';

export class CreateFamilyDto {
  @IsNotEmpty()
  @IsString()
  familyName: string;
}
