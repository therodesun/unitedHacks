import { HttpException, Injectable } from '@nestjs/common';
import { UserRoleEnum } from 'src/modules/user/types/enums';
import { RegisterResponseBodyDto } from '../types/dtos';
import { DbContext } from 'src/modules/database/context/db-context';

@Injectable()
export class AuthService {
  constructor(private readonly dbContext: DbContext) {}

  async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: UserRoleEnum,
  ): Promise<RegisterResponseBodyDto> {
    const existUser = await this.dbContext.users.findOne({ email });

    if (existUser) {
      throw new HttpException('User already exists', 400);
    }

    const entity = new this.dbContext.users({
      firstName,
      lastName,
      email,
      password,
      role,
    });

    await entity.save();
    return { success: true };
  }
}
