import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { WrongPasswordException } from './wrong-password.exception';

@Catch(WrongPasswordException)
export class WrongPasswordExceptionFilter implements ExceptionFilter {
  catch(exception: WrongPasswordException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const responseStatus = HttpStatus.NOT_FOUND;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    response.status(responseStatus).json({
      statusCode: responseStatus,
      message: exception.message,
    });
  }
}
