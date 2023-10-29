import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateInteractionDto {
  @IsNotEmpty()
  @IsNumber()
  readonly interactionId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly srcMemberId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly dstMemberId: number;

  @IsNotEmpty()
  @IsBoolean()
  isChecked: boolean;

  @IsNotEmpty()
  @IsNumber()
  interactionType: number;
}
