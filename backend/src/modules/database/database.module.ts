import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DbContext } from './context/db-context';
import { mongoConnectionOptions } from './database-connection-options';
import { SeederService } from './services';
import { UserSchema } from '../user/collections';
import { TokenSchema } from '../token/collections';
import { UserSeeder } from './seeders';
import { ActionSchema } from '../main/collections';

const collections = [
  { name: 'user', schema: UserSchema },
  { name: 'token', schema: TokenSchema },
  { name: 'action', schema: ActionSchema },
];
const seeders = [UserSeeder];

const modules = [MongooseModule.forRoot(mongoConnectionOptions.url)];
const services = [SeederService];
const models = [MongooseModule.forFeature(collections)];

@Global()
@Module({
  imports: [...modules, ...models],
  controllers: [],
  providers: [DbContext, ...seeders, ...services],
  exports: [DbContext],
})
export class DatabaseModule {}
