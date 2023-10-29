import { IsNotEmpty, IsNumber } from 'class-validator';
import { Long } from 'typeorm';

export class CreateFamilyMemberDto {
  @IsNotEmpty()
  @IsNumber()
  readonly userId: Long;

  @IsNotEmpty()
  @IsNumber()
  readonly familyId: Long;

  @IsNotEmpty()
  @IsNumber()
  readonly role: number;
}
