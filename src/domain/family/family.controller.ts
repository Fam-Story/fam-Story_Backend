import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FamilyService } from './family.service';
import { CreateFamilyDto, ResponseFamilyDto, UpdateFamilyDto } from './dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CustomApiResponse, ResponseCode } from '../../common';
import { CustomApiOKResponse } from '../../common/api/response-ok.decorator';
import { CustomApiCreatedResponse } from '../../common/api/response-created.decorator';
import { JwtServiceAuthGuard } from '../../auth/guards/jwt-service-auth.guard';

@ApiTags('가족 API')
@Controller('family')
@UseGuards(JwtServiceAuthGuard)
@ApiBearerAuth('access-token')
export class FamilyController {
  constructor(private readonly familyService: FamilyService) {}

  //회원이 속한 가족 정보 전송
  @Get('')
  @ApiOperation({
    summary: '[가족] 가족 정보 반환',
    description: '가족 고유 ID를 통해 가족 정보를 반환한다.',
  })
  @CustomApiOKResponse(
    ResponseFamilyDto,
    '가족 고유 ID를 통해 가족 정보를 반환한다.',
  )
  async findFamilyByFamilyId(@Query('familyId') familyId: number) {
    const responseFamilyDto: ResponseFamilyDto =
      await this.familyService.findFamilyById(familyId);
    return CustomApiResponse.success(
      ResponseCode.FAMILY_READ_SUCCESS,
      responseFamilyDto,
    );
  }

  //가족 생성페이지에서 가족 생성
  @Post('')
  @ApiOperation({
    summary: '[가족] 가족 생성',
    description: '가족을 생성한다.',
  })
  @CustomApiCreatedResponse(
    Number,
    '가족 생성을 성공하면 Status Code 201과 familyId를 반환한다.',
  )
  async createFamily(@Body() createFamilyDto: CreateFamilyDto) {
    const familyId = await this.familyService.createFamily(createFamilyDto);
    return CustomApiResponse.success(
      ResponseCode.FAMILY_CREATED_SUCCESS,
      familyId,
    );
  }

  //가족 정보 수정
  @Put('')
  @ApiOperation({
    summary: '[가족] 가족 정보 수정',
    description: '가족 정보를 수정한다.',
  })
  @ApiOkResponse({
    description: '가족의 이름을 수정한다.',
    type: CustomApiResponse<null>,
  })
  async updateFamily(@Body() updateFamilyDto: UpdateFamilyDto) {
    await this.familyService.updateFamily(updateFamilyDto);
    return CustomApiResponse.success(ResponseCode.FAMILY_UPDATE_SUCCESS, null);
  }

  //가족 삭제
  @Delete('')
  @ApiOperation({
    summary: '[가족] 가족 삭제',
    description: '가족을 삭제한다.',
  })
  @ApiOkResponse({
    description:
      '가족을 삭제한다. 이 때 자동으로 가족 구성원 객체는 모두 삭제된다.',
    type: CustomApiResponse<null>,
  })
  async deleteFamily(@Query('familyId') familyId: number) {
    await this.familyService.deleteFamily(familyId);
    return CustomApiResponse.success(ResponseCode.FAMILY_DELETE_SUCCESS, null);
  }

  //초대 키로 가족 정보 검색 (가족 초대) -> 가족 정보 반환
  @Get('/join')
  @ApiOperation({
    summary: '[가족] 초대코드를 통한 가족 참가',
    description:
      '가족의 초대코드로 가족 정보를 불러온 후, 해당 가족에 참가한다.',
  })
  @CustomApiOKResponse(
    ResponseFamilyDto,
    'keyCode에 해당하는 가족 정보를 반환한다.',
  )
  async findFamilyByKeyCode(@Query('keyCode') keyCode: string) {
    const responseFamilyDto: ResponseFamilyDto =
      await this.familyService.findFamilyByKeyCode(keyCode);
    return CustomApiResponse.success(
      ResponseCode.FAMILY_READ_SUCCESS,
      responseFamilyDto,
    );
  }
}
