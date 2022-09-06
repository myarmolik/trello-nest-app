import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../boards/entities/board.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card) private readonly cardsRepository: Repository<Card>,
  ) {}

  async create(board: Board, createCardDto: CreateCardDto): Promise<Card> {
    return this.cardsRepository.save(
      this.cardsRepository.create({ ...createCardDto, board }),
    );
  }

  async findAll(boardId: string): Promise<Card[]> {
    return this.cardsRepository.findBy({ boardId });
  }

  async findOne(boardId: string, id: string): Promise<Card> {
    return await this.cardsRepository.findOneBy({ boardId, id });
  }

  async update(oldCard: Card, updateCardDto: UpdateCardDto): Promise<Card> {
    return this.cardsRepository.save(
      this.cardsRepository.create({ ...oldCard, ...updateCardDto }),
    );
  }

  async remove(boardId: string, id: string): Promise<void> {
    await this.cardsRepository.delete({ boardId, id });
  }
}
