import { PartialType } from '@nestjs/mapped-types';
import { CreateFamilyMemberDto } from './create-family-member.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateFamilyMemberDto extends PartialType(CreateFamilyMemberDto) {
  @IsNotEmpty()
  @IsNumber()
  readonly familyMemberId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly role: number;
}
