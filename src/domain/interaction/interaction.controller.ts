import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { InteractionService } from './interaction.service';
import { CreateInteractionDto } from './dto/create-interaction.dto';

@Controller('interaction')
export class InteractionController {
  constructor(private readonly interactionService: InteractionService) {}

  //상호작용 전송 (생성 및 FCM으로 전송)

  //상호작용 확인 -> 클라이언트에게 상호작용 보낸 후, isChecked를 true로 변경


}
