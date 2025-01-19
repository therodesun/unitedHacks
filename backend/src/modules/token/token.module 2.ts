import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import {
  JWT_ACCESS_EXPIRE_DATE,
  JWT_ACCESS_SECRET_KEY,
} from '../environment/environment';
import { UserModule } from '../user/user.module';
import { TokenService } from './services';

const modules = [
  JwtModule.register({
    secret: JWT_ACCESS_SECRET_KEY,
    signOptions: { expiresIn: JWT_ACCESS_EXPIRE_DATE },
  }),
  forwardRef(() => UserModule),
];
const services = [TokenService];

@Module({
  imports: [...modules],
  controllers: [],
  providers: [...services],
  exports: [...services],
})
export class TokenModule {}
