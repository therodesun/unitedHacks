import { Injectable } from '@nestjs/common';
import { CustomLoggerService } from 'src/modules/logger/services';

@Injectable()
export class SeederService {
  constructor(private readonly customLogger: CustomLoggerService) {}

  async runSeedsAsync(): Promise<void> {
    this.customLogger.log('Running seeders ...', 'Database');
    this.customLogger.log('Finished running seeders', 'Database');
  }
}
