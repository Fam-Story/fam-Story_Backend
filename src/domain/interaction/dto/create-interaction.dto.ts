import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateInteractionDto {
  @IsNotEmpty()
  @IsNumber()
  readonly srcMemberId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly dstMemberId: number;

  @IsNotEmpty()
  @IsNumber()
  interactionType: number;
}
