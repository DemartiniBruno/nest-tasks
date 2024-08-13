import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter{
    constructor(private adapterHost: HttpAdapterHost) {}

    catch(exception: unknown, host: ArgumentsHost) {
      const { httpAdapter } = this.adapterHost;
      const context = host.switchToHttp();

      const status = 
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR

      const body = 
        exception instanceof HttpException
          ? exception.getResponse()
          : {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                timestamp: new Date().toISOString(),
                path: httpAdapter.getRequestUrl(context.getRequest()),
          }

      httpAdapter.reply(context.getResponse(), body, status);
    }
}