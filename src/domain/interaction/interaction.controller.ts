import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { InteractionService } from './interaction.service';
import { CreateInteractionDto } from './dto/create-interaction.dto';

@Controller('interaction')
export class InteractionController {
  constructor(private readonly interactionService: InteractionService) {}

  @Post()
  create(@Body() createInteractionDto: CreateInteractionDto) {
    return this.interactionService.create(createInteractionDto);
  }

  @Get()
  findAll() {
    return this.interactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interactionService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interactionService.remove(+id);
  }
}
