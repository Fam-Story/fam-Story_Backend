import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FamilyMemberService } from '../family/service';
import { CreateFamilyMemberDto, UpdateFamilyMemberDto } from '../family/dto';

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
  update(
    @Param('id') id: string,
    @Body() updateFamilyMemberDto: UpdateFamilyMemberDto,
  ) {
    return this.familyMemberService.update(+id, updateFamilyMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.familyMemberService.remove(+id);
  }
}
