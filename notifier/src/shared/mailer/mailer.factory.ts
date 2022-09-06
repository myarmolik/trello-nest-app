import { ConfigService } from '@nestjs/config';
import { MailerOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-options.interface';

function createMailerOptions(
  config: ConfigService,
): Promise<MailerOptions> | MailerOptions {
  return {
    transport: {
      host: config.get('EMAIL_HOST'),
      port: config.get('EMAIL_PORT'),
    },
    defaults: {
      from: '<sendgrid_from_email_address>',
    },
  };
}

export const mailerFactory = {
  inject: [ConfigService],
  useFactory: createMailerOptions,
};
