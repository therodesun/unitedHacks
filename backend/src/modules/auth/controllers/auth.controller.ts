import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '../services';
import { RegisterRequestBodyDto, RegisterResponseBodyDto } from '../types/dtos';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller({ path: 'auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseInterceptors(
    FileInterceptor('profilePicture', {
      storage: diskStorage({
        destination: './static/images',
        filename: (req, file, cb) => {
          const uniqueName =
            Date.now() +
            '-' +
            Math.round(Math.random() * 1e9) +
            extname(file.originalname);
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async register(
    @Body() body: RegisterRequestBodyDto,
    @UploadedFile() profilePicture: Express.Multer.File,
  ): Promise<RegisterResponseBodyDto> {
    const { email, firstName, lastName, password, role } = body;
    return await this.authService.register(
      firstName,
      lastName,
      email,
      password,
      role,
      profilePicture,
    );
  }
}
