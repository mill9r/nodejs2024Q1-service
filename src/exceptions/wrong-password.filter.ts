import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { WrongPasswordException } from './wrong-password.exception';
import { Response } from 'express';

@Catch(WrongPasswordException)
export class WrongPasswordExceptionFilter implements ExceptionFilter {
  catch(exception: WrongPasswordException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const responseStatus = HttpStatus.FORBIDDEN;
    response.status(responseStatus).json({
      statusCode: responseStatus,
      message: exception.message,
    });
  }
}
