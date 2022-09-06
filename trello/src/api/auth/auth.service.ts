import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/users.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private async isUserValid(user: User, password: string): Promise<boolean> {
    if (user) {
      return bcrypt.compare(password, user.password);
    }
    return false;
  }

  async validateUser(email: string, pass: string): Promise<Partial<User>> {
    const user: User = await this.usersService.findOneByEmail(email);
    if (await this.isUserValid(user, pass)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  login(user: Partial<User>) {
    const payload = { email: user.email, sub: user.id, isAdmin: user.isAdmin };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto): Promise<User | never> {
    return this.usersService.create(createUserDto);
  }
}
