import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

(async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    bufferLogs: true,
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://rabbitmq:5672'],
      queue: 'notifications_queue',
      queueOptions: {
        durable: false,
      },
    },
  });
  const config: ConfigService = app.get(ConfigService);
  const logger: Logger = app.get(Logger);
  const port: number = config.get<number>('PORT');

  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen();
  logger.log(`Notifier started on port ${port}`);
})();
