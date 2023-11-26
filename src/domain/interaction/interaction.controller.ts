import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { InteractionService } from './interaction.service';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { CustomApiResponse, ResponseCode } from '../../common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomApiOKResponse } from '../../common/api/response-ok.decorator';
import { ResponseInteractionDto } from './dto/response-interaction.dto';
import { JwtServiceAuthGuard } from '../../auth/guards/jwt-service-auth.guard';
import { FirebaseCloudMessagingHandler } from '../../common/util/fcm-handler';
import { InteractionType } from '../../common/util/interactionType';

@ApiTags('상호작용 API')
@Controller('api/interaction')
@UseGuards(JwtServiceAuthGuard)
@ApiBearerAuth('access-token')
export class InteractionController {
  constructor(
    private readonly interactionService: InteractionService,
    private readonly fcmHandler: FirebaseCloudMessagingHandler,
  ) {}

  //상호작용 전송 (생성 및 FCM으로 전송)
  @ApiOperation({
    summary: '[상호작용] 상호작용 전송',
    description:
      '상호작용을 Firebase Cloud Messsaging을 통해 전송한 후, db에 상호작용을 저장한다.',
  })
  @CustomApiOKResponse(
    Number,
    '상호작용 전송을 성공하면 Status Code 200과 interactionId를 반환한다.',
  )
  @Post('')
  async createInteraction(@Body() createInteractionDto: CreateInteractionDto) {
    const savedInteraction =
      await this.interactionService.createInteraction(createInteractionDto);

    const interactionId = Number(savedInteraction[0]);
    const memberToken = String(savedInteraction[1]);
    const srcMemberName = String(savedInteraction[2]);
    const dstMemberName = String(savedInteraction[3]);

    const interaction: InteractionType = InteractionType.getInteraction(
      createInteractionDto.interactionType,
      srcMemberName,
      dstMemberName,
    );

    await this.fcmHandler.sendNotification(
      memberToken,
      interaction.title,
      interaction.body,
    );

    return CustomApiResponse.success(
      ResponseCode.INTERACTION_CREATED_SUCCESS,
      Number(interactionId),
    );
  }

  //상호작용 확인 -> 클라이언트에게 상호작용 보낸 후, isChecked를 true로 변경
  @ApiOperation({
    summary: '[상호작용] 상호작용 수신함 확인',
    description:
      '특정 가족 구성원에게 온 모든 상호작용들을 확인한 상태로 변경하고, 모든 상호작용들을 반환한다.',
  })
  @CustomApiOKResponse(
    ResponseInteractionDto,
    '상호작용 확인을 성공하면 Status Code 200과 ResponseInteractionDto 배열을 반환한다.',
  )
  @Get('')
  async checkInteraction(@Query('familyMemberId') dstMemberId: number) {
    const interactions =
      await this.interactionService.findAllInteractions(dstMemberId);
    await this.interactionService.checkAllInteractions(dstMemberId);
    return CustomApiResponse.success(
      ResponseCode.INTERACTION_READ_SUCCESS,
      interactions,
    );
  }

  //상호작용 삭제
  @ApiOperation({
    summary: '[상호작용] 모든 상호작용들 삭제',
    description:
      '사용자가 상호작용 보관함의 삭제를 클릭할 시 상호작용을 삭제한다.',
  })
  @CustomApiOKResponse(
    Number,
    '상호작용 삭제를 성공하면 Status Code 200을 반환한다.',
  )
  @Delete('')
  async deleteInteraction(@Query('familyMemberId') dstMemberId: number) {
    await this.interactionService.deleteAllInteractions(dstMemberId);
    return CustomApiResponse.success(
      ResponseCode.INTERACTION_DELETED_SUCCESS,
      null,
    );
  }
}
