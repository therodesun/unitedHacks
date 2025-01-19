import { HttpException, Injectable } from '@nestjs/common';
import { UserRoleEnum } from 'src/modules/user/types/enums';
import { RegisterResponseBodyDto } from '../types/dtos';
import { DbContext } from 'src/modules/database/context/db-context';
import { join } from 'path';
import * as fs from 'fs';
import { API_BASE_URL } from 'src/modules/environment/environment';

@Injectable()
export class AuthService {
  constructor(private readonly dbContext: DbContext) {}

  async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: UserRoleEnum,
    profilePicture: Express.Multer.File,
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

    // Save the profile picture file to the server
    if (profilePicture) {
      const uploadDir = join(__dirname, '..', '..', 'static', 'images');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      entity.imageUrl =
        API_BASE_URL + '/static/images/' + profilePicture.filename;
    }

    await entity.save();
    return { success: true };
  }
}
