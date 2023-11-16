import { Interaction } from '../../../infra/entities';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseInteractionDto {
  @ApiProperty({ example: 1, description: '상호작용 ID', nullable: false })
  readonly interactionId: number;
  @ApiProperty({
    example: 2,
    description: '상호작용을 보내는 유저 ID',
    nullable: false,
  })
  readonly srcMemberId: number;
  @ApiProperty({
    example: 3,
    description: '상호작용을 받는 유저 ID',
    nullable: false,
  })
  readonly dstMemberId: number;
  @ApiProperty({
    example: true,
    description: '상호작용을 확인했는지 여부',
    nullable: false,
  })
  readonly isChecked: boolean;
  @ApiProperty({ example: 1, description: '상호작용 타입', nullable: false })
  readonly interactionType: number;

  constructor(
    interactionId: number,
    srcMemberId: number,
    dstMemberId: number,
    isChecked: boolean,
    interactionType: number,
  ) {
    this.interactionId = interactionId;
    this.srcMemberId = srcMemberId;
    this.dstMemberId = dstMemberId;
    this.isChecked = isChecked;
    this.interactionType = interactionType;
  }

  static of(
    interactionId: number,
    srcMemberId: number,
    dstMemberId: number,
    isChecked: boolean,
    interactionType: number,
  ): ResponseInteractionDto {
    return new ResponseInteractionDto(
      interactionId,
      srcMemberId,
      dstMemberId,
      isChecked,
      interactionType,
    );
  }

  static from(interaction: Interaction): ResponseInteractionDto {
    return this.of(
      interaction.id,
      interaction.srcMemberId,
      interaction.dstMember.id,
      interaction.isChecked,
      interaction.interactionType,
    );
  }
}
