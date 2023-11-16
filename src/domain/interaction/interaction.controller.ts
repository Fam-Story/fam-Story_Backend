import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { InteractionService } from './interaction.service';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { ApiResponse, ResponseCode } from '../../common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomApiOKResponse } from '../../common/api/response-ok.decorator';
import { ResponseInteractionDto } from './dto/response-interaction.dto';

@ApiTags('상호작용 API')
@Controller('interaction')
export class InteractionController {
  constructor(private readonly interactionService: InteractionService) {}

  //상호작용 전송 (생성 및 FCM으로 전송)
  @ApiOperation({
    summary: '상호작용 전송',
    description:
      '상호작용을 Firebase Cloud Messsaging을 통해 전송한 후, db에 상호작용을 저장한다.',
  })
  @CustomApiOKResponse(
    Number,
    '상호작용 전송을 성공하면 Status Code 200과 interactionId를 반환한다.',
  )
  @Post('/create')
  async createInteraction(@Body() createInteractionDto: CreateInteractionDto) {
    const savedInteractionId =
      await this.interactionService.createInteraction(createInteractionDto);
    //TODO: FCM으로 메시지 전송하기
    return ApiResponse.success(
      ResponseCode.INTERACTION_CREATED_SUCCESS,
      savedInteractionId,
    );
  }

  //상호작용 확인 -> 클라이언트에게 상호작용 보낸 후, isChecked를 true로 변경
  @ApiOperation({
    summary: '상호작용 확인',
    description:
      '상호작용을 확인한 후, 상호작용 정보 배열을 반환하고 확인한 상태로 변경한다.',
  })
  @CustomApiOKResponse(
    ResponseInteractionDto,
    '상호작용 확인을 성공하면 Status Code 200과 ResponseInteractionDto 배열을 반환한다.',
  )
  @Get('/check/:memberId')
  async checkInteraction(@Param('memberId') dstMemberId: number) {
    const interactions =
      await this.interactionService.findAllInteractions(dstMemberId);
    await this.interactionService.checkAllInteractions(dstMemberId);
    return ApiResponse.success(
      ResponseCode.INTERACTION_READ_SUCCESS,
      interactions,
    );
  }

  //상호작용 삭제
  @ApiOperation({
    summary: '상호작용 삭제',
    description:
      '사용자가 상호작용 보관함 삭제를 클릭할 시 상호작용을 삭제한다.',
  })
  @CustomApiOKResponse(
    Number,
    '상호작용 삭제를 성공하면 Status Code 200을 반환한다.',
  )
  @Delete('/delete/:memberId')
  async deleteInteraction(@Param('memberId') dstMemberId: number) {
    await this.interactionService.deleteAllInteractions(dstMemberId);
    return ApiResponse.success(ResponseCode.INTERACTION_DELETED_SUCCESS, null);
  }
}
