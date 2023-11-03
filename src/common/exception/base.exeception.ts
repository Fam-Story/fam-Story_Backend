import { HttpException } from '@nestjs/common';
import { ResponseCode } from '../api';
export class BaseException extends HttpException {
  responseCode: ResponseCode;
  constructor(responseCode: ResponseCode) {
    super(responseCode.message, responseCode.code);
    this.responseCode = responseCode;
  }

  getResponseCode(): ResponseCode {
    return this.responseCode;
  }
}
