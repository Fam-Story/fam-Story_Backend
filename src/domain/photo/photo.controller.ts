import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreatePhotoDto, PhotoService, UpdatePhotoDto } from '../photo';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponse, ResponseCode } from '../../common';

@ApiTags('사진 API')
@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  //사진 업로드
  @Post('')
  @ApiOperation({
    summary: '사진 업로드',
    description: '사진을 업로드한다.',
  })
  async createPhoto(@Body() createPhotoDto: CreatePhotoDto) {
    const photoId = await this.photoService.createPhoto(createPhotoDto);
    return ApiResponse.success(ResponseCode.PHOTO_CREATED_SUCCESS, photoId);
  }

  //사진 삭제
  @Delete('')
  @ApiOperation({
    summary: '사진 삭제',
    description: '사진을 삭제한다.',
  })
  async deletePhoto(@Query() photoId: number) {
    await this.photoService.deletePhoto(photoId);
    return ApiResponse.success(ResponseCode.PHOTO_DELETE_SUCCESS, null);
  }

  //사진 수정
  @Post('/update')
  @ApiOperation({
    summary: '사진 수정',
    description: '사진을 수정한다.',
  })
  async updatePhoto(@Body() updatePhotoDto: UpdatePhotoDto) {
    await this.photoService.updatePhotoInfo(updatePhotoDto);
    return ApiResponse.success(ResponseCode.PHOTO_UPDATE_SUCCESS, null);
  }

  //사진 리스트 반환 (pagination 적용)
  @Get('/list')
  @ApiOperation({
    summary: '사진 리스트 반환',
    description: '사진 리스트를 반환한다.',
  })
  async getPhotos(
    @Query() familyId: number,
    @Query() page: number,
    @Query() limit: number,
  ) {
    const photos = await this.photoService.getPhotos(familyId, page, limit);
    return ApiResponse.success(ResponseCode.PHOTO_READ_SUCCESS, photos);
  }
}
