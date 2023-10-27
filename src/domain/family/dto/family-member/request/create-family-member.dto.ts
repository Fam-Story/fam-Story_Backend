import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Long } from 'typeorm';

export class CreateFamilyMemberDto {
  @IsNotEmpty()
  @IsNumber()
  userId: Long;

  @IsNotEmpty()
  @IsNumber()
  role: number;
}
