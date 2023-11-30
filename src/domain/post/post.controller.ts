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
import {
  CreatePostDto,
  PostService,
  ResponsePostDto,
  UpdatePostDto,
} from '../post';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomApiCreatedResponse } from '../../common/api/response-created.decorator';
import { CustomApiResponse, ResponseCode } from '../../common';
import { CustomApiOKResponse } from '../../common/api/response-ok.decorator';
import { JwtServiceAuthGuard } from '../../auth/guards/jwt-service-auth.guard';

@ApiTags('게시글 API')
@Controller('api/post')
@UseGuards(JwtServiceAuthGuard)
@ApiBearerAuth('access-token')
export class PostController {
  constructor(private readonly postService: PostService) {}

  //포스트 등록
  @Post('')
  @ApiOperation({
    summary: '[게시글] 게시글 등록',
    description: '게시글을 등록한다.',
  })
  @CustomApiCreatedResponse(
    Number,
    '게시글을 등록하면 게시글의 고유 ID를 integer로 반환한다.',
  )
  async createPost(@Body() createPostDto: CreatePostDto) {
    const postId = await this.postService.createPost(createPostDto);
    return CustomApiResponse.success(ResponseCode.POST_CREATED_SUCCESS, postId);
  }

  //포스트 수정
  @Put('')
  @ApiOperation({
    summary: '[게시글] 게시글 수정',
    description: '게시글의 제목과 내용 등을 수정한다.',
  })
  @CustomApiCreatedResponse(
    Number,
    '게시글을 수정하면 게시글 고유 ID를 integer로 반환한다.',
  )
  async updatePost(@Body() updatePostDto: UpdatePostDto) {
    await this.postService.updatePost(updatePostDto);
    return CustomApiResponse.success(ResponseCode.POST_UPDATE_SUCCESS, null);
  }

  //포스트 삭제
  @Delete('')
  @ApiOperation({
    summary: '[게시글] 게시글 삭제',
    description: '게시글을 삭제한다.',
  })
  @CustomApiCreatedResponse(
    Number,
    '게시글을 삭제하면 포스트의 고유 ID를 integer로 반환한다.',
  )
  async deletePost(@Query('postId') postId: number) {
    await this.postService.deletePost(postId);
    return CustomApiResponse.success(ResponseCode.POST_DELETE_SUCCESS, null);
  }

  //포스트 리스트 반환
  //TODO: 모든 포스트 불러오도록 수정
  @Get('')
  @ApiOperation({
    summary: '[게시글] 특정 가족에 등록된 모든 게시글 반환',
    description: '특정 가족에 등록된 모든 게시글들을 반환한다.',
  })
  @CustomApiOKResponse(
    ResponsePostDto,
    '모든 게시글에 대한 정보를 배열 형태로 반환한다.',
  )
  async findPostList(@Query('familyId') familyId: number) {
    const responsePostDtoList: ResponsePostDto[] =
      await this.postService.findPostListByFamilyId(familyId);
    return CustomApiResponse.success(
      ResponseCode.POST_READ_SUCCESS,
      responsePostDtoList,
    );
  }
}
