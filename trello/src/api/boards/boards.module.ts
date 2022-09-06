import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { BoardSubscriber } from './subscribers/board.subscriber';
import { NotifierModule } from '../../modules/notifier.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), NotifierModule, UsersModule],
  controllers: [BoardsController],
  providers: [BoardsService, BoardSubscriber],
  exports: [BoardsService],
})
export class BoardsModule {}
