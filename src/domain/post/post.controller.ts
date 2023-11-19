import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  CreatePostDto,
  PostService,
  ResponsePostDto,
  UpdatePostDto,
} from '../post';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import { CustomApiCreatedResponse } from '../../common/api/response-created.decorator';
import { ApiResponse, ResponseCode } from '../../common';
import { CustomApiOKResponse } from '../../common/api/response-ok.decorator';

@ApiTags('게시글 API')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  //포스트 등록
  @Post('')
  @ApiOperation({
    summary: '포스트 등록',
    description: '포스트를 등록한다.',
  })
  @CustomApiCreatedResponse(
    Number,
    '포스트를 등록하면 포스트의 고유 ID를 integer로 반환한다.',
  )
  async createPost(@Body() createPostDto: CreatePostDto) {
    const postId = await this.postService.createPost(createPostDto);
    return ApiResponse.success(ResponseCode.POST_CREATED_SUCCESS, postId);
  }

  //포스트 수정
  @Put('')
  @ApiOperation({
    summary: '포스트 수정',
    description: '포스트를 수정한다.',
  })
  @CustomApiCreatedResponse(
    Number,
    '포스트를 수정하면 포스트의 고유 ID를 integer로 반환한다.',
  )
  async updatePost(@Body() updatePostDto: UpdatePostDto) {
    await this.postService.updatePost(updatePostDto);
    return ApiResponse.success(ResponseCode.POST_UPDATE_SUCCESS, null);
  }

  //포스트 삭제
  @Delete('')
  @ApiOperation({
    summary: '포스트 삭제',
    description: '포스트를 삭제한다.',
  })
  @CustomApiCreatedResponse(
    Number,
    '포스트를 삭제하면 포스트의 고유 ID를 integer로 반환한다.',
  )
  async deletePost(@Query() postId: number) {
    await this.postService.deletePost(postId);
    return ApiResponse.success(ResponseCode.POST_DELETE_SUCCESS, null);
  }

  //포스트 리스트 반환
  @Get('')
  @ApiOperation({
    summary: '포스트 리스트 반환',
    description: '포스트 리스트를 반환한다.',
  })
  @CustomApiOKResponse(ResponsePostDto, '포스트 리스트를 반환한다.')
  async findPostList(@Query('id') familyId: number) {
    const responsePostDtoList: ResponsePostDto[] =
      await this.postService.findPostListByMemberId(familyId);
    return ApiResponse.success(
      ResponseCode.POST_READ_SUCCESS,
      responsePostDtoList,
    );
  }
}
