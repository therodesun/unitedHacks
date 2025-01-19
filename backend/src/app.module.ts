import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { loadEnvironmentVariables } from './env-loader';
import { DatabaseModule } from './modules/database/database.module';
import { EmailModule } from './modules/email/email.module';
import { ExceptionModule } from './modules/exception/exception.module';
import { InterceptorModule } from './modules/interceptor/interceptor.module';
import { LoggerModule } from './modules/logger/logger.module';
import { LoggerMiddleware } from './modules/logger/middlewares';
import { SharedModule } from './modules/shared/shared.module';
import { NodeEnvironmentEnum } from './modules/shared/types/enums';
import { TokenModule } from './modules/token/token.module';
import { UserModule } from './modules/user/user.module';
import { ValidationModule } from './modules/validation/validation.module';
import { AuthModule } from './modules/auth/auth.module';
import { LoginModule } from './modules/login/login.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const modules = [
  ConfigModule.forRoot({
    isGlobal: true,
    load: [
      () => {
        let environment: any = process.env.NODE_ENV;

        if (
          environment !== NodeEnvironmentEnum.LOCAL &&
          environment !== NodeEnvironmentEnum.DEVELOPMENT &&
          environment !== NodeEnvironmentEnum.PRODUCTION
        ) {
          environment = NodeEnvironmentEnum.LOCAL;
        }

        loadEnvironmentVariables(environment);
        return {};
      },
    ],
  }),
  SharedModule,
  LoggerModule,
  ExceptionModule,
  InterceptorModule,
  ValidationModule,
  DatabaseModule,
  UserModule,
  EmailModule,
  TokenModule,
  AuthModule,
  LoginModule,
  ServeStaticModule.forRoot({
    renderPath: 'static',
    rootPath: join(__dirname, '..', 'static'),
  }),
];

@Module({
  imports: [...modules],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
