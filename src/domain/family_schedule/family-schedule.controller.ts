import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  FamilyScheduleService,
  ResponseFamilyScheduleDto,
} from './index';
import { CreateFamilyScheduleDto, UpdateFamilyScheduleDto } from './dto';
import { ApiResponse, ResponseCode } from '../../common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomApiCreatedResponse } from '../../common/api/response-created.decorator';
import { CustomApiOKResponse } from '../../common/api/response-ok.decorator';

@ApiTags('가족 일정 API')
@Controller('family-schedule')
export class FamilyScheduleController {
  constructor(private readonly familyScheduleService: FamilyScheduleService) {}

  //가족 일정 생성
  @ApiOperation({
    summary: '가족 일정 생성',
    description: '가족 일정을 생성한다.',
  })
  @CustomApiCreatedResponse(
    Number,
    '가족 일정 생성을 성공하면 Status Code 201과 familyScheduleId를 반환한다.',
  )
  @Post('/create')
  async createFamilySchedule(
    @Body() createFamilyScheduleDto: CreateFamilyScheduleDto,
  ) {
    const familyScheduleId =
      await this.familyScheduleService.createFamilySchedule(
        createFamilyScheduleDto,
      );
    return ApiResponse.success(
      ResponseCode.FAMILY_SCHEDULE_CREATED_SUCCESS,
      familyScheduleId,
    );
  }

  //가족 일정 수정
  @ApiOperation({
    summary: '가족 일정 수정',
    description: '가족 일정을 수정한다.',
  })
  @ApiOkResponse({
    description: '가족 일정을 수정한다.',
    type: ApiResponse<null>,
  })
  @Patch('/update')
  async updateFamilySchedule(
    @Body() updateFamilyScheduleDto: UpdateFamilyScheduleDto,
  ) {
    await this.familyScheduleService.updateFamilySchedule(
      updateFamilyScheduleDto,
    );
    return ApiResponse.success(
      ResponseCode.FAMILY_SCHEDULE_UPDATE_SUCCESS,
      null,
    );
  }

  //가족 일정 삭제
  @ApiOperation({
    summary: '가족 일정 삭제',
    description: '가족 일정을 삭제한다.',
  })
  @ApiOkResponse({
    description: '가족 일정을 삭제한다.',
    type: ApiResponse<null>,
  })
  @Delete('/delete/:id')
  async deleteFamilySchedule(@Param('id') familyScheduleId: number) {
    await this.familyScheduleService.deleteFamilySchedule(familyScheduleId);
    return ApiResponse.success(
      ResponseCode.FAMILY_SCHEDULE_DELETE_SUCCESS,
      null,
    );
  }
  //가족 일정 조회
  @Get('/get/:id')
  @ApiOkResponse({
    description: '가족 일정을 반환한다.',
    type: ApiResponse<ResponseFamilyScheduleDto>,
  }) //CustomOkResponse로 수정 필요
  @ApiOperation({
    summary: '가족 일정 조회',
    description: '가족 일정을 조회한다.',
  })
  async findFamilyScheduleById(@Param('id') familyScheduleId: number) {
    const responseFamilyScheduleDto: ResponseFamilyScheduleDto =
      await this.familyScheduleService.findFamilyScheduleById(familyScheduleId);
    return ApiResponse.success(
      ResponseCode.FAMILY_SCHEDULE_READ_SUCCESS,
      responseFamilyScheduleDto,
    );
  }

  //가족 일정 리스트 반환 (pagination 적용)
  @ApiOperation({
    summary: '가족 일정 리스트 반환',
    description: '가족 일정 리스트를 반환한다.',
  })
  @ApiOkResponse({
    description: '가족 일정 리스트를 반환한다.',
    type: ApiResponse<ResponseFamilyScheduleDto[]>,
  })
  @Get('/list/:id')
  async findFamilyScheduleList(
    @Param('id') familyId: number,
    @Query('year') year: number,
    @Query('targetMonth') targetMonth: number,
  ) {

    const familyScheduleList =
      await this.familyScheduleService.findFamilyScheduleList(
        familyId,
        year,
        targetMonth,
      );
    return ApiResponse.success(
      ResponseCode.FAMILY_SCHEDULE_READ_SUCCESS,
      familyScheduleList,
    );
  }
}
