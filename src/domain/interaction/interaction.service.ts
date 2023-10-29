import { Injectable } from '@nestjs/common';
import { CreateInteractionDto } from './dto/create-interaction.dto';

@Injectable()
export class InteractionService {
  create(createInteractionDto: CreateInteractionDto) {
    return 'This action adds a new interaction';
  }

  findAll() {
    return `This action returns all interaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} interaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} interaction`;
  }
}
