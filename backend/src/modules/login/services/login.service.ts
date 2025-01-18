import { HttpException, Injectable } from '@nestjs/common';
import { DbContext } from 'src/modules/database/context/db-context';
import { LoginDto } from '../types/dtos/login.dto'; 

export class LoginService {
  constructor(private readonly dbContext: DbContext) {}

  async login(loginDto: LoginDto): Promise<string> {
    const { email, password } = loginDto;
    const user = await this.dbContext.users.findOne({ email });

    if (!user) {
      throw new HttpException('Invalid credentials', 400); 
    }

    if (user.password !== password) {
      throw new HttpException('Invalid credentials', 400); 
    }

    return 'Login successful'; 
}
}