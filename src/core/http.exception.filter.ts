import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(Error)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception.message.includes('duplicate key value violates unique constraint '))
      exception.message = 'User already exists';

    response
      .status(500)
      .json({
        timestamp: Math.floor(Date.now() / 1000),
        status: 500,
        message: exception.message,
        path: request.url,
      });
  }
}