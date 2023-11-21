import { ApiProperty } from '@nestjs/swagger';

export class CustomApiHeader {
  @ApiProperty({ example: 200 })
  code: number;

  @ApiProperty({ example: true })
  success: boolean;

  constructor(code: number, success: boolean) {
    this.code = code;
    this.success = success;
  }
}
