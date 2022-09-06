import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';

(async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const config: ConfigService = app.get(ConfigService);
  const logger: Logger = app.get(Logger);
  const port: number = config.get<number>('PORT');

  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(port, () => logger.log(`Notifier started on port ${port}`));
})();
