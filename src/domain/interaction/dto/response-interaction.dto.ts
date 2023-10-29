export class ResponseInteractionDto {
  readonly interactionId: number;
  readonly srcMemberId: number;
  readonly dstMemberId: number;
  isChecked: boolean;
  interactionType: number;

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
}
