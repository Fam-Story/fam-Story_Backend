export class CreateInteractionDto {
  interactionId: number;
  srcMemberId: number;
  dstMemberId: number;
  isChecked: boolean;
  interactionType: number;
}
