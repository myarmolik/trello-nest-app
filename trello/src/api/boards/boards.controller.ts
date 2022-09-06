import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OnlyAdminGuard } from '../auth/guards/only-admin.guard';
import { E_BOARD_NOT_FOUND } from '../../common/exceptions';

@UseGuards(JwtAuthGuard)
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @UseGuards(OnlyAdminGuard)
  @Post()
  async create(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.create(createBoardDto);
  }

  @Get()
  async findAll(): Promise<Board[]> {
    return this.boardsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Board> {
    const board = await this.boardsService.findOne(id);
    if (!board) {
      throw new NotFoundException(E_BOARD_NOT_FOUND);
    }

    return board;
  }

  @UseGuards(OnlyAdminGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ): Promise<Board> {
    const oldBoard = await this.boardsService.findOne(id);
    if (!oldBoard) {
      throw new NotFoundException(E_BOARD_NOT_FOUND);
    }

    return this.boardsService.update(oldBoard, updateBoardDto);
  }

  @UseGuards(OnlyAdminGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const board = await this.boardsService.findOne(id);
    if (!board) {
      throw new NotFoundException(E_BOARD_NOT_FOUND);
    }

    return this.boardsService.remove(id);
  }
}
