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

  @ApiProperty({
    example: 1,
    description: '상호작용을 보낸 구성원의 닉네임',
    nullable: false,
  })
  readonly srcMemberNickname: string;

  @ApiProperty({
    example: 1,
    description: '상호작용을 보낸 구성원의 역할',
    nullable: false,
  })
  readonly srcMemberRole: number;

  constructor(
    interactionId: number,
    srcMemberId: number,
    dstMemberId: number,
    isChecked: boolean,
    interactionType: number,
    srcMemberNickname: string,
    srcMemberRole: number,
  ) {
    this.interactionId = interactionId;
    this.srcMemberId = srcMemberId;
    this.dstMemberId = dstMemberId;
    this.isChecked = isChecked;
    this.interactionType = interactionType;
    this.srcMemberNickname = srcMemberNickname;
    this.srcMemberRole = srcMemberRole;
  }

  static of(
    interactionId: number,
    srcMemberId: number,
    dstMemberId: number,
    isChecked: boolean,
    interactionType: number,
    srcMemberNickname: string,
    srcMemberRole: number,
  ): ResponseInteractionDto {
    return new ResponseInteractionDto(
      interactionId,
      srcMemberId,
      dstMemberId,
      isChecked,
      interactionType,
      srcMemberNickname,
      srcMemberRole,
    );
  }

  static from(interaction: Interaction): ResponseInteractionDto {
    return this.of(
      interaction.id,
      interaction.srcMemberId,
      interaction.dstMember.id,
      interaction.isChecked,
      interaction.interactionType,
      interaction.nickname,
      interaction.role,
    );
  }
}
