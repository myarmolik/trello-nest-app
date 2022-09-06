import * as path from 'path';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerFactory } from './shared/mailer/mailer.factory';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { loggerFactory } from './shared/logger/logger.factory';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const envFilePath = path.join(__dirname, 'common', 'envs', '.env');

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
    }),
    LoggerModule.forRootAsync(loggerFactory),
    MailerModule.forRootAsync(mailerFactory),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
