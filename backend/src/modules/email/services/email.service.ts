import { Injectable } from '@nestjs/common';
import { SendMailOptions } from 'nodemailer';
import { CustomLoggerService } from 'src/modules/logger/services';
import { MailerService } from './mailer.service';
import { TemplateService } from './template.service';

@Injectable()
export class EmailService {
  constructor(
    private readonly templateService: TemplateService,
    private readonly mailerService: MailerService,
    private readonly logger: CustomLoggerService,
  ) {}

  async sendCustomMail(
    fromValues: {
      name: string;
      address: string;
    },
    toAddress: string,
    subject: string,
    templateName: string,
    context: any,
    cc: string[] = [],
  ): Promise<void> {
    const html = await this.templateService.compileTemplate(
      templateName,
      context,
    );

    const from = { name: fromValues.name, address: fromValues.address };

    const mailOptions: SendMailOptions = {
      from,
      to: toAddress,
      subject,
      html,
      cc,
    };

    if (context.ATTACHMENTS) {
      mailOptions.attachments = context.ATTACHMENTS;
    }

    await this.mailerService.sendMail(mailOptions as any);
  }
}
