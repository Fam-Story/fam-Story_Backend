import { IsNotEmpty, IsNumber } from 'class-validator';

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
