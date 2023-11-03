import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const res: any = exception.getResponse();

    const url: string = request.url;
    const error: string = res.error;
    const timestamp: string = new Date().toISOString();

    console.log('요청 url : ', url);
    console.log('error 정보 : ', error);
    console.log('발생 시간 : ', timestamp);

    response.status(status).json({
      success: false,
      message: res.message,
    });
  }
}
