import { IsNotEmpty, IsNumber } from 'class-validator';
import { Long } from 'typeorm';

export class CreateFamilyMemberDto {
  @IsNotEmpty()
  @IsNumber()
  readonly userId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly familyId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly role: number;
}
