/**
 * @file http-exception.filter.ts -  This is responsible for handling all thrown exceptions across your whole application
 * @author Kalimuthu Selvaraj
 * @version 1.0.0
 * created: 05/07/2018
 * lastModified: 05/07/2018
 */
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    response
      .status(status)
      .json({
        statusCode: exception.getStatus(),
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}