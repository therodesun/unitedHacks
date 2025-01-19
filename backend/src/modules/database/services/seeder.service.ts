import { Injectable } from '@nestjs/common';
import { CustomLoggerService } from 'src/modules/logger/services';
import { UserSeeder } from '../seeders';

@Injectable()
export class SeederService {
  constructor(
    private readonly customLogger: CustomLoggerService,
    private readonly userSeeder: UserSeeder,
  ) {}

  async runSeedsAsync(): Promise<void> {
    this.customLogger.log('Running seeders ...', 'Database');
    await this.userSeeder.run();
    this.customLogger.log('Finished running seeders', 'Database');
  }
}
