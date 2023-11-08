import { IsNotEmpty, IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateFamilyDto {
  @ApiProperty({ example: '푸앙이네 가족' })
  @IsNotEmpty()
  @IsString()
  familyName: string;
}
