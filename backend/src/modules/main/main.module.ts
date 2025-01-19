import { Module } from '@nestjs/common';
import { MainController } from './controllers/main.controller';
import { MainService } from './services/main.service';

@Module({
  controllers: [MainController],
  providers: [MainService],
})
export class MainModule {}
