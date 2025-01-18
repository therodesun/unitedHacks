import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  LoggerService,
} from '@nestjs/common';
import { Response } from 'express';
import { NODE_ENV } from 'src/modules/environment/environment';
import { NodeEnvironmentEnum } from 'src/modules/shared/types/enums';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggerService: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    if (NODE_ENV !== NodeEnvironmentEnum.PRODUCTION) {
      this.loggerService.error(
        exception.message,
        exception.stack,
        exception.name,
      );
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();

    const errorResponse: any = exception.getResponse();

    const messages = [];

    if (typeof errorResponse === 'object') {
      if (errorResponse.statusCode === 422) {
        errorResponse?.message?.forEach((validationMessage) =>
          messages.push(validationMessage),
        );
      } else {
        messages.push(errorResponse.message);
      }
    } else {
      if (typeof errorResponse === 'string') {
        messages.push(errorResponse);
      }
      // no way for this case
    }

    const customResponse: any = { errors: messages };
    response.status(status).json(customResponse);
  }
}
