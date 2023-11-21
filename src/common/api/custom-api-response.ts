import { ResponseCode } from './response-code';
import { CustomApiHeader } from './custom-api-header';
import { ApiProperty } from '@nestjs/swagger';
export class CustomApiResponse<T> {
  @ApiProperty({ type: CustomApiHeader })
  header: CustomApiHeader;
  @ApiProperty()
  message: string;
  data: T;

  constructor(header: CustomApiHeader, message: string, data: T) {
    this.header = header;
    this.message = message;
    this.data = data;
  }

  static success<T>(responseCode: ResponseCode, data: T): CustomApiResponse<T> {
    return new CustomApiResponse<T>(
      new CustomApiHeader(responseCode.code, true),
      responseCode.message,
      data,
    );
  }

  static fail<T>(responseCode: ResponseCode, data: T): CustomApiResponse<T> {
    return new CustomApiResponse<T>(
      new CustomApiHeader(responseCode.code, false),
      responseCode.message,
      data,
    );
  }
}
