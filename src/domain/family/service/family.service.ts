import { Injectable } from '@nestjs/common';
import { CreateFamilyDto } from '../dto/request/create-family.dto';
import { UpdateFamilyDto } from '../dto/request/update-family.dto';

@Injectable()
export class FamilyService {
  create(createFamilyDto: CreateFamilyDto) {
    return 'This action adds a new family';
  }

  findAll() {
    return `This action returns all family`;
  }

  findOne(id: number) {
    return `This action returns a #${id} family`;
  }

  update(id: number, updateFamilyDto: UpdateFamilyDto) {
    return `This action updates a #${id} family`;
  }

  remove(id: number) {
    return `This action removes a #${id} family`;
  }
}
