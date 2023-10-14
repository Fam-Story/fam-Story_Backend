import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FamilyMemberService } from '../domain/family-member/family-member.service';
import { CreateFamilyMemberDto } from '../domain/family-member/dto/create-family-member.dto';
import { UpdateFamilyMemberDto } from '../domain/family-member/dto/update-family-member.dto';

@Controller('family-member')
export class FamilyMemberController {
  constructor(private readonly familyMemberService: FamilyMemberService) {}

  @Post()
  create(@Body() createFamilyMemberDto: CreateFamilyMemberDto) {
    return this.familyMemberService.create(createFamilyMemberDto);
  }

  @Get()
  findAll() {
    return this.familyMemberService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.familyMemberService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFamilyMemberDto: UpdateFamilyMemberDto) {
    return this.familyMemberService.update(+id, updateFamilyMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.familyMemberService.remove(+id);
  }
}
