import { ResponseCode } from './response-code';
import { ApiHeader } from './api-header';
export class ApiResponse<T> {
  header: ApiHeader;
  data: T;
  message: string;
  constructor(header: ApiHeader, data: T, message: string) {
    this.header = header;
    this.data = data;
    this.message = message;
  }

  static success<T>(responseCode: ResponseCode, data: T): ApiResponse<T> {
    return new ApiResponse<T>(
      new ApiHeader(responseCode.code, true),
      data,
      responseCode.message,
    );
  }

  static fail<T>(responseCode: ResponseCode, data: T): ApiResponse<T> {
    return new ApiResponse<T>(
      new ApiHeader(responseCode.code, false),
      data,
      responseCode.message,
    );
  }
}
