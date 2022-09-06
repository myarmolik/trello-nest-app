import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
  HttpStatus,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { E_BOARD_NOT_FOUND, E_CARD_NOT_FOUND } from '../../common/exceptions';
import { BoardsService } from '../boards/boards.service';

@UseGuards(JwtAuthGuard)
@Controller('boards/:boardId/cards')
export class CardsController {
  constructor(
    private readonly cardsService: CardsService,
    private readonly boardsService: BoardsService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Body() createCardDto: CreateCardDto,
  ) {
    const board = await this.boardsService.findOne(boardId);
    if (!board) {
      throw new NotFoundException(E_BOARD_NOT_FOUND);
    }

    return this.cardsService.create(board, createCardDto);
  }

  @Get()
  async findAll(@Param('boardId', ParseUUIDPipe) boardId: string) {
    return this.cardsService.findAll(boardId);
  }

  @Get(':id')
  async findOne(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const card = await this.cardsService.findOne(boardId, id);
    if (!card) {
      throw new NotFoundException(E_CARD_NOT_FOUND);
    }

    return card;
  }

  @Patch(':id')
  async update(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    const oldCard = await this.cardsService.findOne(boardId, id);
    if (!oldCard) {
      throw new NotFoundException(E_CARD_NOT_FOUND);
    }

    return this.cardsService.update(oldCard, updateCardDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const card = await this.cardsService.findOne(boardId, id);
    if (!card) {
      throw new NotFoundException(E_CARD_NOT_FOUND);
    }

    return this.cardsService.remove(boardId, id);
  }
}
