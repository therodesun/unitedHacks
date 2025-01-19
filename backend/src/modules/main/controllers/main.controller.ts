import { Body, Controller, Get, Post } from '@nestjs/common';
import { MainService } from '../services/main.service';
import { ActionType } from '../types/action-type.enum';

@Controller('main')
export class MainController {
  constructor(private readonly mainService: MainService) {}

  @Get('users')
  async getAllUsers() {
    return await this.mainService.getAllUsers();
  }

  @Post('action')
  async action(
    @Body() body: { action: ActionType; userId: string; email: string },
  ) {
    const { action, userId, email } = body;
    return await this.mainService.action(action, userId, email);
  }
}
