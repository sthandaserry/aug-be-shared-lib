/**
 * @file http-exception.filter.ts -  This is responsible for handling all thrown exceptions across your whole application
 * @author Kalimuthu Selvaraj
 * @version 1.0.0
 * created: 05/07/2018
 * lastModified: 09/07/2018
 */

import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status === HttpStatus.UNAUTHORIZED)
      return response.status(status).json({
        statusCode: exception.getStatus(),
        timestamp: new Date().toISOString(),
        message: exception.message,
        path: request.url,
      });
    if (status === HttpStatus.NOT_FOUND)
      return response.status(status).json({
        statusCode: exception.getStatus(),
        timestamp: new Date().toISOString(),
        message: exception.message,
        path: request.url,
      });
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      if (process.env.NODE_ENV === 'production') {
        console.error(exception.stack);
        return response.status(status).send(exception.stack);
      }
      else {
        const message = exception.stack;
        return response.status(status).send(message);
      }
    }
  }
}