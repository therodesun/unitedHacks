import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as handlebars from 'handlebars';
import { TemplateContext } from '../types';
import { CustomLoggerService } from 'src/modules/logger/services';

@Injectable()
export class TemplateService {
  constructor(private readonly logger: CustomLoggerService) {}

  private renderHtmlView(htmlView: string, context: TemplateContext): string {
    const keys = Object.keys(context);

    for (const key of keys) {
      htmlView = htmlView.replace(`{{${key}}}`, context[key]);
    }

    return htmlView;
  }

  compileTemplate(templateName: string, context: TemplateContext): string {
    const templatePath = this.getTemplatePath(templateName);
    const templateHtml = readFileSync(templatePath, { encoding: 'utf-8' });

    const renderedTemplateHtml = this.renderHtmlView(templateHtml, context);

    const pageHtml = this.compilePageHtml(renderedTemplateHtml);

    if (context.RAW_HTML) {
      pageHtml.replace('{{{RAW_HTML}}}', context.RAW_HTML);
    }

    return this.compilePageText(pageHtml, context);
  }

  private compilePageHtml(templateHtml: string): string {
    const layoutPath = this.getLayoutPath();
    const layoutHtmlText = readFileSync(layoutPath, { encoding: 'utf-8' });

    const result = layoutHtmlText.replace('{{{BODY}}}', templateHtml);
    return result;
  }

  private compilePageText(pageHtml: string, context: TemplateContext): string {
    const template = handlebars.compile(pageHtml);

    const compiledHtml = template(context);
    return compiledHtml;
  }

  private getTemplatePath(templateName: string): string {
    try {
      const filePath = join(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'src',
        'modules',
        'email',
        'templates',
        'views',
        `${templateName}.email.html`,
      );

      return filePath;
    } catch (e) {
      this.logger.error(e);
    }
  }

  private getLayoutPath(): string {
    const layoutPath = join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'src',
      'modules',
      'email',
      'templates',
      'layouts',
      `default.email.html`,
    );
    return layoutPath;
  }
}
