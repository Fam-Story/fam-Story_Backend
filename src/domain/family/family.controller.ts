import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FamilyService } from './family.service';
import { CreateFamilyDto, UpdateFamilyDto } from './dto';

@Controller('family')
export class FamilyController {
  constructor(private readonly familyService: FamilyService) {}

  //회원이 속한 가족 정보 전송

  //가족 생성페이지에서 가족 생성

  //가족 정보 수정

  //가족 삭제

  //초대 키로 가족 정보 검색 (가족 초대) -> 가족 정보 반환
}
