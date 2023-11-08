import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FamilyMemberService } from '../family-member';
import { CreateFamilyMemberDto, UpdateFamilyMemberDto } from './dto';

@Controller('family-member')
export class FamilyMemberController {
  constructor(private readonly familyMemberService: FamilyMemberService) {}

  //User를 가족에 추가

  //가족 멤버 정보 수정

  //가족 탈퇴 (즉, 가족 멤버 삭제)

  //가족 정보 반환
}
