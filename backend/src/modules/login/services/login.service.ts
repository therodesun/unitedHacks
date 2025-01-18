import { Injectable } from '@nestjs/common';
import { LoginDto } from '../types/dtos/login.dto';

@Injectable()
export class LoginService {
  // Simulating a simple user check. Replace with real database logic.
  private readonly users = [
    { username: 'admin', password: 'password123' },
  ];

  async login(loginDto: LoginDto): Promise<string> {
    const user = this.users.find(user => user.username === loginDto.username);

    if (!user || user.password !== loginDto.password) {
      throw new Error('Invalid credentials');
    }

    // Return a success message or JWT token in a real-world scenario.
    return 'Login successful';
  }
}