import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './services';
import { UserController } from './controllers';
import { TokenModule } from '../token/token.module';

const modules = [forwardRef(() => TokenModule)];
const controllers = [UserController];
const services = [UserService];

@Module({
  controllers: [...controllers],
  imports: [...modules],
  providers: [...services],
  exports: [...services],
})
export class UserModule {}
