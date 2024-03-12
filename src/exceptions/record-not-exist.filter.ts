import { CustomNotFoundException } from './record-not-exist.exception';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { Response } from 'express';

@Catch(CustomNotFoundException)
export class CustomNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: CustomNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const responseStatus = HttpStatus.NOT_FOUND;

    response.status(responseStatus).json({
      statusCode: responseStatus,
      message: exception.message,
    });
  }
}
