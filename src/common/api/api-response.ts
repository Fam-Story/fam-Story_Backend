import { ResponseCode } from './response-code';
import { ApiHeader } from './api-header';
import { ApiProperty } from '@nestjs/swagger';
export class ApiResponse<T> {
  @ApiProperty({ type: ApiHeader })
  header: ApiHeader;
  @ApiProperty()
  message: string;
  data: T;

  constructor(header: ApiHeader, message: string, data: T) {
    this.header = header;
    this.message = message;
    this.data = data;
  }

  static success<T>(responseCode: ResponseCode, data: T): ApiResponse<T> {
    return new ApiResponse<T>(
      new ApiHeader(responseCode.code, true),
      responseCode.message,
      data,
    );
  }

  static fail<T>(responseCode: ResponseCode, data: T): ApiResponse<T> {
    return new ApiResponse<T>(
      new ApiHeader(responseCode.code, false),
      responseCode.message,
      data,
    );
  }
}
