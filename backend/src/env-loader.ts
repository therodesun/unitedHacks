import * as dotenv from 'dotenv';
import * as path from 'path';

export const loadEnvironmentVariables = (environment: string): void => {
  const envFile = `.env.${environment}`;
  const envFilePath = path.resolve(__dirname, '..', envFile);

  dotenv.config({ path: envFilePath });
};
