import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';
import {
  MONGO_HOST,
  MONGO_PASS,
  MONGO_PORT,
  MONGO_URL,
  MONGO_USER,
} from '../environment/environment';

export const mongoConnectionOptions: MongoConnectionOptions = {
  type: 'mongodb',
  host: MONGO_HOST,
  port: Number(MONGO_PORT),
  username: MONGO_USER,
  password: MONGO_PASS,
  url: MONGO_URL,
};
