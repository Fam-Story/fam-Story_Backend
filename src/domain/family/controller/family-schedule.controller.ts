import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FamilyScheduleService } from '../service';
import { CreateFamilyScheduleDto, UpdateFamilyScheduleDto } from '../dto';

@Controller('family-schedule')
export class FamilyScheduleController {
  constructor(private readonly familyScheduleService: FamilyScheduleService) {}

  @Post()
  create(@Body() createFamilyScheduleDto: CreateFamilyScheduleDto) {
    return this.familyScheduleService.create(createFamilyScheduleDto);
  }

  @Get()
  findAll() {
    return this.familyScheduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.familyScheduleService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFamilyScheduleDto: UpdateFamilyScheduleDto,
  ) {
    return this.familyScheduleService.update(+id, updateFamilyScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.familyScheduleService.remove(+id);
  }
}
