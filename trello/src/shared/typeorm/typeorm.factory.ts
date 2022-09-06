import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export function createTypeOrmOptions(
  config: ConfigService,
): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: config.get<string>('POSTGRES_HOST'),
    port: config.get<number>('POSTGRES_PORT'),
    database: config.get<string>('POSTGRES_DB'),
    username: config.get<string>('POSTGRES_USER'),
    password: config.get<string>('POSTGRES_PASSWORD'),
    entities: [path.join(__dirname, '../../**/*.entity.{ts,js}')],
    //subscribers: [BoardSubscriber, CardSubscriber],
    migrations: [path.join(__dirname, '../../migrations/*.{ts,js}')],
    migrationsTableName: 'typeorm_migrations',
    synchronize: false, // never use TRUE in production!
    migrationsRun: true,
  };
}

export const typeormFactory = {
  inject: [ConfigService],
  useFactory: createTypeOrmOptions,
};
