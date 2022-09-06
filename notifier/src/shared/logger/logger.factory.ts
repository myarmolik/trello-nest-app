import { ConfigService } from '@nestjs/config';
import { Params } from 'nestjs-pino/params';

async function createLoggerOptions(config: ConfigService): Promise<Params> {
  const loggerFile = config.get<string>('LOGGER_FILE');

  return {
    pinoHttp: {
      level: config.get<string>('LOGGER_LEVEL') || 'debug',
      transport: {
        target: loggerFile ? 'pino/file' : 'pino-pretty',
        options: { destination: loggerFile },
      },
    },
  };
}

export const loggerFactory = {
  inject: [ConfigService],
  useFactory: createLoggerOptions,
};
