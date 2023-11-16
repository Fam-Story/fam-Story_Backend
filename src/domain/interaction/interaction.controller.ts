import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { InteractionService } from './interaction.service';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { ApiResponse, ResponseCode } from '../../common';
import {ApiTags} from "@nestjs/swagger";

@ApiTags('상호작용 API')
@Controller('interaction')
export class InteractionController {
  constructor(private readonly interactionService: InteractionService) {}

  //상호작용 전송 (생성 및 FCM으로 전송)
  @Post('/create')
  async createInteraction(@Body() createInteractionDto: CreateInteractionDto) {
    const savedInteractionId = await this.interactionService.createInteraction(createInteractionDto);
    //TODO: FCM으로 메시지 전송하기
    return ApiResponse.success(
      ResponseCode.INTERACTION_CREATED_SUCCESS,
      savedInteractionId,
    );
  }

  //상호작용 확인 -> 클라이언트에게 상호작용 보낸 후, isChecked를 true로 변경
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
  @Delete('/delete/:memberId')
  async deleteInteraction(@Param('memberId') dstMemberId: number) {
    await this.interactionService.deleteAllInteractions(dstMemberId);
    return ApiResponse.success(ResponseCode.INTERACTION_DELETED_SUCCESS, null);
  }
}
