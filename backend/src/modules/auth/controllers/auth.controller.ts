import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services';
import { RegisterRequestBodyDto, RegisterResponseBodyDto } from '../types/dtos';

@Controller({ path: 'auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() body: RegisterRequestBodyDto,
  ): Promise<RegisterResponseBodyDto> {
    const { email, firstName, lastName, password, role } = body;
    return await this.authService.register(
      firstName,
      lastName,
      email,
      password,
      role,
    );
  }
}
