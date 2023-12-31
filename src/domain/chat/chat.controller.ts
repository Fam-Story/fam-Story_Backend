import { Controller, Delete, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CustomApiOKResponse } from '../../common/api/response-ok.decorator';
import { ResponseChatDto } from './dto/response-chat.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtServiceAuthGuard } from '../../auth/guards/jwt-service-auth.guard';
import { CustomApiResponse, ResponseCode } from '../../common';

@ApiTags('채팅 API')
@UseGuards(JwtServiceAuthGuard)
@Controller('api/chat')
@ApiBearerAuth('access-token')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Get('')
  @ApiOperation({
    summary: '[채팅] 모든 채팅 조회',
    description: '가족의 모든 채팅 기록들을 조회한다.',
  })
  @CustomApiOKResponse(ResponseChatDto, '가족 채팅 조회 성공')
  async getAllChat(@Req() req, @Query('familyId') familyId: number) {
    const chatMessages: ResponseChatDto[] = await this.chatService.findAllChat(
      req.user.id,
      familyId,
    );
    return CustomApiResponse.success(
      ResponseCode.CHAT_READ_SUCCESS,
      chatMessages,
    );
  }

  @Delete('')
  @ApiOperation({
    summary: '[채팅] 모든 채팅 삭제',
    description: '가족이 삭제될 때, 가족의 채팅내역 또한 모두 삭제한다.',
  })
  @CustomApiOKResponse(ResponseChatDto, '가족 채팅 삭제 성공')
  async deleteChat(@Req() req, @Query('familyId') familyId: number) {
    await this.chatService.deleteAllChat(req.user.id, familyId);
    return CustomApiResponse.success(ResponseCode.CHAT_DELETE_SUCCESS, null);
  }
}
