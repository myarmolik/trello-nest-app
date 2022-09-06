import * as path from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { BoardsModule } from './api/boards/boards.module';
import { CardsModule } from './api/cards/cards.module';
import { loggerFactory } from './shared/logger/logger.factory';
import { AuthModule } from './api/auth/auth.module';
import { typeormFactory } from './shared/typeorm/typeorm.factory';
import { UsersModule } from './api/users/users.module';

const envFilePath = path.join(__dirname, 'common', 'envs', '.env');

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
    }),
    LoggerModule.forRootAsync(loggerFactory),
    TypeOrmModule.forRootAsync(typeormFactory),
    UsersModule,
    BoardsModule,
    CardsModule,
    AuthModule,
  ],
})
export class AppModule {}
