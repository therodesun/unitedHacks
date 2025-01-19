import { Injectable } from '@nestjs/common';
import { DbContext } from 'src/modules/database/context/db-context';
import { LoginDto } from '../types/dtos/login.dto';
import { HttpException } from '@nestjs/common';
import { TokenService } from 'src/modules/token/services/token.service'; 

@Injectable()
export class LoginService {
  constructor(
    private readonly dbContext: DbContext,
    private readonly tokenService: TokenService, 
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;

    try {
      const user = await this.dbContext.users.findOne({ email });
      if (!user) {
        throw new HttpException('Invalid credentials', 400);
      }

      if (user.password !== password) {
        throw new HttpException('Invalid credentials', 400);
      }

      const  {accessToken} = await this.tokenService.generateUserTokens(user); 

      return {
        message: 'Login successful',
        accessToken,
      
      };
    } catch (error) {
      console.error(error);
      throw new HttpException('Internal server error', 500);
    }
  }
}