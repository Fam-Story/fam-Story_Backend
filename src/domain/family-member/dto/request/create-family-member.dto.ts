import { IsNotEmpty, IsNumber } from 'class-validator';
import { Long } from 'typeorm';

export class CreateFamilyMemberDto {
  @IsNotEmpty()
  @IsNumber()
  userId: Long;

  @IsNotEmpty()
  @IsNumber()
  familyId: Long;

  @IsNotEmpty()
  @IsNumber()
  role: number;
}
