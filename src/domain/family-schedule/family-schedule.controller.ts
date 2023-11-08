import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FamilyScheduleService } from '../family-schedule';
import { CreateFamilyScheduleDto, UpdateFamilyScheduleDto } from './dto';

@Controller('family-schedule')
export class FamilyScheduleController {
  constructor(private readonly familyScheduleService: FamilyScheduleService) {}

  //가족 일정 생성

    //가족 일정 수정

    //가족 일정 삭제

    //가족 일정 리스트 반환 (pagination 적용)
}
