import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { CustomApiResponse } from '../api';
import { BaseException } from '../exception/base.exeception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | BaseException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    ctx.getRequest();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let message = (exceptionResponse as any).message;
    const error = (exceptionResponse as any).error;

    if (exception instanceof BaseException) {
      // 예외 유형이 BaseException 일 때
      const responseCode = exception.getResponseCode();
      response.status(status).json(CustomApiResponse.fail(responseCode, null));
    } else {
      //아니라면
      if (!message) {
        message = 'An unexpected error occurred';
      }
      response
        .status(status)
        .json(
          CustomApiResponse.fail(
            { code: status, message: error || message },
            null,
          ),
        );
    }
  }
}
