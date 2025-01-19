import { Module } from '@nestjs/common';
import { LoginController } from './controllers/login.controller';
import { LoginService } from './services/login.service';
import { LoginDto } from './types/dtos/login.dto';  // Correct path to DTO
import { TokenModule } from 'src/modules/token/token.module'; 

@Module({
  controllers: [LoginController],
  imports: [TokenModule], 
  providers: [LoginService],
})
export class LoginModule {}