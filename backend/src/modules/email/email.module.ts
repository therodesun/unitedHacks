import { Module } from '@nestjs/common';
import { EmailService, MailerService, TemplateService } from './services';

const modules = [];
const services = [TemplateService, EmailService, MailerService];

@Module({
  controllers: [],
  imports: [...modules],
  providers: [...services],
  exports: [...services],
})
export class EmailModule {}
