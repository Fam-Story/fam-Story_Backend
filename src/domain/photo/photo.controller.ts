import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PhotoService } from '../photo';
import { CreatePhotoDto, ResponsePhotoDto, UpdatePhotoDto } from './dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CustomApiResponse, ResponseCode } from '../../common';
import { JwtServiceAuthGuard } from '../../auth/guards/jwt-service-auth.guard';
import { CustomApiOKResponse } from '../../common/api/response-ok.decorator';

@ApiTags('사진 API')
@Controller('api/photo')
@UseGuards(JwtServiceAuthGuard)
@ApiBearerAuth('access-token')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  //사진 업로드
  @Post('')
  @ApiOperation({
    summary: '[사진] 사진 업로드',
    description: '사진을 업로드한다.',
  })
  @CustomApiOKResponse(
    Number,
    '사진 업로드를 성공하면 Status Code 201과 photoId를 반환한다.',
  )
  async createPhoto(@Body() createPhotoDto: CreatePhotoDto) {
    const photoId = await this.photoService.createPhoto(createPhotoDto);
    return CustomApiResponse.success(
      ResponseCode.PHOTO_CREATED_SUCCESS,
      photoId,
    );
  }

  //사진 삭제
  @Delete('')
  @ApiOperation({
    summary: '[사진] 사진 삭제',
    description: '사진을 삭제한다.',
  })
  @ApiOkResponse({
    description: '사진 삭제 성공할 시, Status Code 200를 반환한다',
  })
  async deletePhoto(@Query('photoId') photoId: number) {
    await this.photoService.deletePhoto(photoId);
    return CustomApiResponse.success(ResponseCode.PHOTO_DELETE_SUCCESS, null);
  }

  //사진 수정
  @Put('')
  @ApiOperation({
    summary: '[사진] 사진 정보 수정',
    description: '사진의 정보 수정한다.',
  })
  @ApiOkResponse({
    description: '사진의 정보를 수정할 시, Status Code 200 반환',
  })
  async updatePhoto(@Body() updatePhotoDto: UpdatePhotoDto) {
    await this.photoService.updatePhotoInfo(updatePhotoDto);
    return CustomApiResponse.success(ResponseCode.PHOTO_UPDATE_SUCCESS, null);
  }

  //사진 리스트 반환 (pagination 적용)
  @Get('/list')
  @ApiOperation({
    summary: '[사진] 모든 가족 사진 반환',
    description:
      '가족의 모든 사진을 반환한다. 가족 Id와 페이지, 한 페이지당 사진 개수를 Query parameter로 받는다.',
  })
  @CustomApiOKResponse(ResponsePhotoDto, 'ResponsePhotoDto의 배열을 반환한다.')
  async getPhotos(
    @Query('familyId') familyId: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const photos = await this.photoService.getPhotos(familyId, page, limit);
    return CustomApiResponse.success(ResponseCode.PHOTO_READ_SUCCESS, photos);
  }
}
