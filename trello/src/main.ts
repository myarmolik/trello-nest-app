import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

(async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const config: ConfigService = app.get(ConfigService);
  const logger: Logger = app.get(Logger);
  const port: number = config.get<number>('PORT');

  app.setGlobalPrefix('api');
  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(port, () => logger.log(`Trello started on port ${port}`));
})();
