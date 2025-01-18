import { ConfigService } from '@nestjs/config';
import { loadEnvironmentVariables } from 'src/env-loader';
import { NodeEnvironmentEnum } from '../shared/types/enums';

const configService = new ConfigService();

let environment: any = process.env.NODE_ENV;

if (
  environment !== NodeEnvironmentEnum.LOCAL &&
  environment !== NodeEnvironmentEnum.DEVELOPMENT &&
  environment !== NodeEnvironmentEnum.PRODUCTION
) {
  environment = NodeEnvironmentEnum.LOCAL;
}

loadEnvironmentVariables(environment);

export const PORT = configService.get<number>('PORT', 3000);

export const NODE_ENV = (() => {
  let environment = configService.get<string>(
    'NODE_ENV',
    NodeEnvironmentEnum.LOCAL,
  );

  if (
    environment !== NodeEnvironmentEnum.LOCAL &&
    environment !== NodeEnvironmentEnum.DEVELOPMENT &&
    environment !== NodeEnvironmentEnum.PRODUCTION
  ) {
    environment = NodeEnvironmentEnum.LOCAL;
  }

  return environment;
})();

export const MONGO_URL = configService.get<string>(
  'MONGO_URL',
  'mongodb+srv://hackiedoodles:Uh3crMjVyhwxBmwI@unitedhacks.slpoi.mongodb.net/?retryWrites=true&w=majority&appName=unitedhacks',
);
export const MONGO_HOST = configService.get<string>('MONGO_HOST', 'localhost');
export const MONGO_PORT = configService.get<number>('MONGO_PORT', 27017);
export const MONGO_USER = configService.get<string>(
  'MONGO_USER',
  'hackiedoodles',
);
export const MONGO_PASS = configService.get<string>(
  'MONGO_PASS',
  'Uh3crMjVyhwxBmwI',
);

export const EMAIL_HOST = configService.get<string>('EMAIL_HOST', 'soon');
export const EMAIL_PORT = configService.get<number>('EMAIL_PORT', 587);
export const EMAIL_USER = configService.get<string>('EMAIL_USER', 'soon');
export const EMAIL_PASSWORD = configService.get<string>(
  'EMAIL_PASSWORD',
  'postgres',
);
export const DEFAULT_EMAIL_FROM = configService.get<string>(
  'DEFAULT_EMAIL_FROM',
  'no-reply@unitedhacks.com',
);
export const EMAIL_QUEUE = configService.get<string>('EMAIL_QUEUE', 'email');

export const JWT_ACCESS_SECRET_KEY = configService.get<string>(
  'JWT_ACCESS_SECRET_KEY',
  'C3gLcl8y6JdZt2LsLGQ3IjzvMy9KGGCh',
);
export const JWT_REFRESH_SECRET_KEY = configService.get<string>(
  'JWT_REFRESH_SECRET_KEY',
  'ddTb0XB2YTTDyJtOOAT0OmQyrfDqxots',
);
export const JWT_ACCESS_EXPIRE_DATE = configService.get<string>(
  'JWT_ACCESS_EXPIRE_DATE',
  '7d',
);
export const JWT_REFRESH_EXPIRE_DATE = configService.get<string>(
  'JWT_REFRESH_EXPIRE_DATE',
  '30d',
);

export const TOKEN_DB_SECRET_KEY = configService.get<string>(
  'TOKEN_DB_SECRET_KEY',
  'BI9DghYknrFuBYMcY78rc7dNqvS99xwJ',
);
export const TOKEN_DB_SALT_KEY = configService.get<string>(
  'TOKEN_DB_SALT_KEY',
  '5QqBLQZc1jkw26LGtUXn8NCifFxkIZ1l',
);

export const PROJECT_NAME = configService.get<string>(
  'PROJECT_NAME',
  'United Hacks',
);

export const API_BASE_URL = configService.get<string>(
  'API_BASE_URL',
  'https://api.unitedhacks.com',
);

export const APP_BASE_URL = configService.get<string>(
  'APP_BASE_URL',
  'https://app.unitedhacks.com',
);
