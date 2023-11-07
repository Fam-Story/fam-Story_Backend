import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('로그인 응답 dto')
export class ResponseLoginDto {
  @ApiProperty({ example: 'ebeUUEBadfjsiew823bDfbj' })
  token: string;

  @ApiProperty({ example: false })
  isBelongedToFamily: boolean;

  constructor(token: string, isBelongedToFamily: boolean) {
    this.token = token;
    this.isBelongedToFamily = isBelongedToFamily;
  }

  static of(token: string, isBelongedToFamily: boolean): ResponseLoginDto {
    return new ResponseLoginDto(token, isBelongedToFamily);
  }
}
