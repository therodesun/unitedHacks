import { Module } from '@nestjs/common';
import { TokenModule } from 'src/modules/token/token.module';
import { LoginController } from './controllers/login.controller';
import { LoginService } from './services/login.service';

@Module({
  controllers: [LoginController],
  imports: [TokenModule],
  providers: [LoginService],
})
export class LoginModule {}
