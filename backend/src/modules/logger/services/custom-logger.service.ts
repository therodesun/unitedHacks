import {
  HttpException,
  Inject,
  Injectable,
  LoggerService,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class CustomLoggerService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly loggerService: LoggerService,
  ) {}

  error(error: HttpException | Error | string, context?: string): void {
    this.loggerService.error(error, undefined, context);
  }

  warn(message: Record<string, any> | string, context?: string): void {
    this.loggerService.warn(message, context);
  }

  log(message: Record<string, any> | string, context?: string): void {
    this.loggerService.log(message, context);
  }

  verbose(message: Record<string, any> | string, context?: string): void {
    this.loggerService.verbose(message, context);
  }

  debug(message: Record<string, any> | string, context?: string): void {
    this.loggerService.debug(message, context);
  }
}
