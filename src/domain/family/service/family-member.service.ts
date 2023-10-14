import { Injectable } from '@nestjs/common';
import { CreateFamilyMemberDto } from '../dto/request/create-family-member.dto';
import { UpdateFamilyMemberDto } from '../dto/request/update-family-member.dto';

@Injectable()
export class FamilyMemberService {
  create(createFamilyMemberDto: CreateFamilyMemberDto) {
    return 'This action adds a new familyMember';
  }

  findAll() {
    return `This action returns all familyMember`;
  }

  findOne(id: number) {
    return `This action returns a #${id} familyMember`;
  }

  update(id: number, updateFamilyMemberDto: UpdateFamilyMemberDto) {
    return `This action updates a #${id} familyMember`;
  }

  remove(id: number) {
    return `This action removes a #${id} familyMember`;
  }
}