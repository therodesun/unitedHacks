import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from '../services/login.service';
import { LoginDto } from '../types/dtos/login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body() loginDto: LoginDto): Promise<any> {
    return await this.loginService.login(loginDto);
  }
}
