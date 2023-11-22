import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  CreateFamilyScheduleDto,
  UpdateFamilyScheduleDto,
  ResponseFamilyScheduleDto,
} from './dto';
import { CustomApiResponse, ResponseCode } from '../../common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CustomApiCreatedResponse } from '../../common/api/response-created.decorator';
import { CustomApiOKResponse } from '../../common/api/response-ok.decorator';
import { FamilyScheduleService } from './family-schedule.service';
import { JwtServiceAuthGuard } from '../../auth/guards/jwt-service-auth.guard';

@ApiTags('가족 일정 API')
@Controller('family-schedule')
@UseGuards(JwtServiceAuthGuard)
@ApiBearerAuth('access-token')
export class FamilyScheduleController {
  constructor(private readonly familyScheduleService: FamilyScheduleService) {}

  //가족 일정 생성
  @ApiOperation({
    summary: '[일정] 가족 일정 생성',
    description: '가족 일정을 생성한다.',
  })
  @CustomApiCreatedResponse(
    Number,
    '가족 일정 생성을 성공하면 Status Code 201과 familyScheduleId를 반환한다.',
  )
  @Post('')
  async createFamilySchedule(
    @Body() createFamilyScheduleDto: CreateFamilyScheduleDto,
  ) {
    const familyScheduleId =
      await this.familyScheduleService.createFamilySchedule(
        createFamilyScheduleDto,
      );
    return CustomApiResponse.success(
      ResponseCode.FAMILY_SCHEDULE_CREATED_SUCCESS,
      familyScheduleId,
    );
  }

  //가족 일정 수정
  @ApiOperation({
    summary: '[일정] 가족 일정 수정',
    description: '가족 일정을 수정한다.',
  })
  @ApiOkResponse({
    description: '날짜와 일정 내용 등 가족 일정을 수정한다.',
    type: CustomApiResponse<null>,
  })
  @Put('')
  async updateFamilySchedule(
    @Body() updateFamilyScheduleDto: UpdateFamilyScheduleDto,
  ) {
    await this.familyScheduleService.updateFamilySchedule(
      updateFamilyScheduleDto,
    );
    return CustomApiResponse.success(
      ResponseCode.FAMILY_SCHEDULE_UPDATE_SUCCESS,
      null,
    );
  }

  //가족 일정 삭제
  @ApiOperation({
    summary: '[일정] 가족 일정 삭제',
    description: '가족 일정을 삭제한다.',
  })
  @ApiOkResponse({
    description: '가족 일정을 삭제한다.',
    type: CustomApiResponse<null>,
  })
  @Delete('')
  async deleteFamilySchedule(@Query('scheduleId') familyScheduleId: number) {
    await this.familyScheduleService.deleteFamilySchedule(familyScheduleId);
    return CustomApiResponse.success(
      ResponseCode.FAMILY_SCHEDULE_DELETE_SUCCESS,
      null,
    );
  }
  //가족 일정 조회
  @Get('')
  @ApiOperation({
    summary: '[일정] 특정 가족 일정 조회',
    description: '특정 가족 일정을 조회한다.',
  })
  @CustomApiOKResponse(
    ResponseFamilyScheduleDto,
    '특정 일정에 대한 정보를 반환한다.',
  ) //CustomOkResponse로 수정 필요
  async findFamilyScheduleById(@Query('scheduleId') familyScheduleId: number) {
    const responseFamilyScheduleDto: ResponseFamilyScheduleDto =
      await this.familyScheduleService.findFamilyScheduleById(familyScheduleId);
    return CustomApiResponse.success(
      ResponseCode.FAMILY_SCHEDULE_READ_SUCCESS,
      responseFamilyScheduleDto,
    );
  }

  //가족 일정 리스트 반환 (pagination 적용)
  @ApiOperation({
    summary: '[일정] 모든 가족 일정들 불러오기',
    description: '가족에 등록된 모든 일정들을 반환한다.',
  })
  @CustomApiOKResponse(
    ResponseFamilyScheduleDto,
    '모든 가족 일정 정보가 담긴 Dto를 배열로 반환한다. (ResponseFamilyScheduleDto를 배열로 반환)',
  )
  @Get('/list')
  async findFamilyScheduleList(
    @Query('familyId') familyId: number,
    @Query('year') year: number,
    @Query('targetMonth') targetMonth: number,
  ) {
    const familyScheduleList =
      await this.familyScheduleService.findFamilyScheduleList(
        familyId,
        year,
        targetMonth,
      );
    return CustomApiResponse.success(
      ResponseCode.FAMILY_SCHEDULE_READ_SUCCESS,
      familyScheduleList,
    );
  }
}
