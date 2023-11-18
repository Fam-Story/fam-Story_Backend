import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, Put, Query,
} from '@nestjs/common';
import { FamilyMemberService } from './index';
import { CreateFamilyMemberDto, UpdateFamilyMemberDto } from './dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponse, ResponseCode } from '../../common';
import { CustomApiCreatedResponse } from '../../common/api/response-created.decorator';
import { CustomApiOKResponse } from '../../common/api/response-ok.decorator';
import { ResponseFamilyDto } from '../family';

@ApiTags('가족 멤버 API')
@Controller('family-member')
export class FamilyMemberController {
  constructor(private readonly familyMemberService: FamilyMemberService) {}

  //User를 가족에 추가
  @Post('')
  @ApiOperation({
    summary: '가족 멤버 생성',
    description: '가족 멤버를 생성한다.',
  })
  @CustomApiCreatedResponse(
    Number,
    '가족 멤버 생성을 성공하면 Status Code 201과 familyMemberId를 반환한다.',
  )
  async createFamilyMember(
    @Body() createFamilyMemberDto: CreateFamilyMemberDto,
  ) {
    const familyMemberId = await this.familyMemberService.createFamilyMember(
      createFamilyMemberDto,
    );
    return ApiResponse.success(
      ResponseCode.FAMILY_MEMBER_CREATED_SUCCESS,
      familyMemberId,
    );
  }

  //가족 멤버 정보 수정
  @Put('')
  @ApiOperation({
    summary: '가족 멤버 정보 수정',
    description: '가족 멤버 정보를 수정한다.',
  })
  @ApiOkResponse({
    description: '가족 멤버 정보 수정 성공시 200을 반환',
    type: ApiResponse<number>,
  })
  async updateFamilyMember(
    @Body() updateFamilyMemberDto: UpdateFamilyMemberDto,
  ) {
    await this.familyMemberService.updateFamilyMember(updateFamilyMemberDto);
    return ApiResponse.success(ResponseCode.FAMILY_MEMBER_UPDATE_SUCCESS, null);
  }

  //가족 탈퇴 (즉, 가족 멤버 삭제)
  @Delete('')
  @ApiOperation({ summary: '가족 삭제', description: '가족 멤버를 삭제한다.' })
  @ApiOkResponse({
    description: '가족 멤버를 삭제한다.',
    type: ApiResponse<null>,
  })
  async deleteFamilyMember(@Query('id') familyMemberId: number) {
    await this.familyMemberService.deleteFamilyMember(familyMemberId);
    return ApiResponse.success(ResponseCode.FAMILY_MEMBER_DELETE_SUCCESS, null);
  }

  //가족 정보 반환
  @Get('')
  @ApiOperation({
    summary: '가족 정보 조회',
    description: '회원이 속한 가족 정보를 반환한다.',
  })
  @CustomApiOKResponse(ResponseFamilyDto, '가족 정보를 반환한다.')
  async findFamilyByMemberId(@Query('id') userId: number) {
    const responseFamilyDto: ResponseFamilyDto =
      await this.familyMemberService.findFamilyByMemberId(userId);
    return ApiResponse.success(
      ResponseCode.FAMILY_READ_SUCCESS,
      responseFamilyDto,
    );
  }
}
