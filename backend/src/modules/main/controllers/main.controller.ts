import { Controller, Get } from '@nestjs/common';
import { MainService } from '../services/main.service';

@Controller('main')
export class MainController {
  constructor(private readonly mainService: MainService) {}

  @Get('users')
  async getAllUsers() {
    return await this.mainService.getAllUsers();
  }
}
