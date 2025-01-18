import { Module } from '@nestjs/common';
import { AuthController } from './controllers';
import { AuthService } from './services';

const modules = [];
const controllers = [AuthController];
const services = [AuthService];

@Module({
  controllers: [...controllers],
  imports: [...modules],
  providers: [...services],
  exports: [...services],
})
export class AuthModule {}
