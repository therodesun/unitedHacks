import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/modules/token/guards';
import { JwtPayload } from 'src/modules/token/types/jwt-payload';
import { GetMeResponseDto } from '../types/dtos';

@Controller({ path: 'user' })
export class UserController {
  @UseGuards(AccessTokenGuard)
  @ApiResponse({ status: 200, type: GetMeResponseDto })
  @Get('me')
  async getMe(@Req() req: { user: JwtPayload }): Promise<GetMeResponseDto> {
    const { user } = req;
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };
  }
}
