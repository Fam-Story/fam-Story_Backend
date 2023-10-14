import { PartialType } from '@nestjs/mapped-types';
import { CreateFamilyMemberDto } from './create-family-member.dto';

export class UpdateFamilyMemberDto extends PartialType(CreateFamilyMemberDto) {}
