import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly boardsRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 8);
    return this.boardsRepository.save(
      this.boardsRepository.create(createUserDto),
    );
  }

  async findAll(): Promise<User[]> {
    return this.boardsRepository.find();
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.boardsRepository.findOneBy({ email });
  }
}
