import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { FamilyService } from './family.service';
import { CreateFamilyDto, ResponseFamilyDto, UpdateFamilyDto } from './dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponse, ResponseCode } from '../../common';
import { CustomApiOKResponse } from '../../common/api/response-ok.decorator';
import { CustomApiCreatedResponse } from '../../common/api/response-created.decorator';

@ApiTags('가족 API')
@Controller('family')
export class FamilyController {
  constructor(private readonly familyService: FamilyService) {}

  //회원이 속한 가족 정보 전송
  @Get('')
  @ApiOperation({
    summary: '가족 정보 조회',
    description: '회원이 속한 가족 정보를 반환한다.',
  })
  @CustomApiOKResponse(ResponseFamilyDto, '가족 정보를 반환한다.')
  async findFamilyByUserId(@Query('id') userId: number) {
    const responseFamilyDto: ResponseFamilyDto =
      await this.familyService.findFamilyById(userId);
    return ApiResponse.success(
      ResponseCode.FAMILY_READ_SUCCESS,
      responseFamilyDto,
    );
  }

  //가족 생성페이지에서 가족 생성
  @Post('')
  @ApiOperation({ summary: '가족 생성', description: '가족을 생성한다.' })
  @CustomApiCreatedResponse(
    Number,
    '가족 생성을 성공하면 Status Code 201과 familyId를 반환한다.',
  )
  async createFamily(@Body() createFamilyDto: CreateFamilyDto) {
    const familyId = await this.familyService.createFamily(createFamilyDto);
    return ApiResponse.success(ResponseCode.FAMILY_CREATED_SUCCESS, familyId);
  }

  //가족 정보 수정
  @Put('')
  @ApiOperation({
    summary: '가족 정보 수정',
    description: '가족 정보를 수정한다.',
  })
  @ApiOkResponse({
    description: '가족 정보를 수정한다.',
    type: ApiResponse<null>,
  })
  async updateFamily(@Body() updateFamilyDto: UpdateFamilyDto) {
    await this.familyService.updateFamily(updateFamilyDto);
    return ApiResponse.success(ResponseCode.FAMILY_UPDATE_SUCCESS, null);
  }

  //가족 삭제
  @Delete('')
  @ApiOperation({ summary: '가족 삭제', description: '가족을 삭제한다.' })
  @ApiOkResponse({ description: '가족을 삭제한다.', type: ApiResponse<null> })
  async deleteFamily(@Query('id') familyId: number) {
    await this.familyService.deleteFamily(familyId);
    return ApiResponse.success(ResponseCode.FAMILY_DELETE_SUCCESS, null);
  }

  //초대 키로 가족 정보 검색 (가족 초대) -> 가족 정보 반환
  @Get('/join')
  @ApiOperation({
    summary: '가족 참가',
    description:
      '가족의 초대코드로 가족 정보를 검색한 후, 해당 가족에 참가한다..',
  })
  @CustomApiOKResponse(
    ResponseFamilyDto,
    'keyCode에 해당하는 가족 정보를 반환한다.',
  )
  async findFamilyByKeyCode(@Query('keyCode') keyCode: string) {
    const responseFamilyDto: ResponseFamilyDto =
      await this.familyService.findFamilyByKeyCode(keyCode);
    return ApiResponse.success(
      ResponseCode.FAMILY_READ_SUCCESS,
      responseFamilyDto,
    );
  }
}
