import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { loadEnvironmentVariables } from './env-loader';
import { SeederService } from './modules/database/services';
import {
  NODE_ENV,
  PORT,
  PROJECT_NAME,
} from './modules/environment/environment';
import { ResponseTransformer } from './modules/interceptor/transformers';
import { CustomLoggerService } from './modules/logger/services';
import { NodeEnvironmentEnum } from './modules/shared/types/enums';
import { CustomValidationPipe } from './modules/validation/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  let environment: any = NODE_ENV;
  if (
    environment !== NodeEnvironmentEnum.LOCAL &&
    environment !== NodeEnvironmentEnum.DEVELOPMENT &&
    environment !== NodeEnvironmentEnum.PRODUCTION
  ) {
    environment = NodeEnvironmentEnum.DEVELOPMENT;
  }
  loadEnvironmentVariables(environment);

  app.enableCors();

  const logger = app.get<CustomLoggerService>(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);

  logger.log(`Starting server in '${environment}' mode`);

  app.useGlobalPipes(
    new CustomValidationPipe({
      skipNullProperties: true,
      whitelist: true,
    }),
  );

  app.useGlobalInterceptors(new ResponseTransformer());

  const seederService = app.get<SeederService>(SeederService);
  await seederService.runSeedsAsync();

  const config = new DocumentBuilder()
    .setTitle(PROJECT_NAME + ' Endpoint List')
    .setDescription(
      `Welcome to the ${PROJECT_NAME} API! This API serves as the backend for the ${PROJECT_NAME} project, providing a range of functionalities and related operations.`,
    )
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('endpoint/list', app, document);

  await app.listen(PORT);
}

bootstrap();
