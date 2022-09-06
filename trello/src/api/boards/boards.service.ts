import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,
  ) {}

  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsRepository.save(
      this.boardsRepository.create(createBoardDto),
    );
  }

  async findAll(): Promise<Board[]> {
    return this.boardsRepository.find(); // { relations: ['cards'] }
  }

  async findOne(id: string): Promise<Board> {
    return await this.boardsRepository.findOneBy({ id });
  }

  async update(
    oldBoard: Board,
    updateBoardDto: UpdateBoardDto,
  ): Promise<Board> {
    return this.boardsRepository.save(
      this.boardsRepository.create({ ...oldBoard, ...updateBoardDto }),
    );
  }

  async remove(id: string): Promise<void> {
    await this.boardsRepository.delete(id);
  }
}
