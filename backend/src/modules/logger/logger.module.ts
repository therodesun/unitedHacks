import { Global, Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { CustomLoggerService } from './services/custom-logger.service';
import {
  Format,
  red,
  yellow,
  green,
  cyanBright,
  magentaBright,
} from 'cli-color';
import * as winston from 'winston';
import { isObject } from '@nestjs/common/utils/shared.utils';

const modules = [
  WinstonModule.forRoot({
    format: winston.format.combine(
      winston.format.timestamp({ format: 'MM/DD/YYYY, hh:mm:ss A' }),
      winston.format.ms(),
      winston.format.printf(({ timestamp, level, message, ms, context }) => {
        const color = (lvl: string): Format => {
          const colorMap = {
            error: red,
            warn: yellow,
            info: green,
            verbose: cyanBright,
            debug: magentaBright,
          };

          return colorMap[lvl];
        };
        const contextMessage = context ? yellow(`[${context}] `) : '';
        const levelMessage = color(level)(`[${level}] ${process.pid}  -`);
        const messageText = isObject(message)
          ? `\n${JSON.stringify(message, null, 2)}`
          : color(level)(message);
        return `${levelMessage} ${timestamp}     ${green('LOG')} ${yellow(
          '[CustomLogger]',
        )} ${contextMessage}${messageText} ${yellow(ms)}`;
      }),
    ),
    transports: [
      new winston.transports.Console({
        level: 'silly',
        handleExceptions: true,
      }),
    ],
  }),
];
const services = [CustomLoggerService];

@Global()
@Module({
  imports: [...modules],
  controllers: [],
  providers: [...services],
  exports: [...services],
})
export class LoggerModule {}
