import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User as UserEntity } from '../users/entities/users.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from './decorators/user.decorator';
import { UsersService } from '../users/users.service';
import { E_USER_CONFLICT } from '../../common/exceptions';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@User() user: Partial<UserEntity>): Partial<UserEntity> {
    return user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserEntity | never> {
    const user: UserEntity = await this.usersService.findOneByEmail(
      createUserDto.email,
    );

    if (user) {
      throw new BadRequestException(E_USER_CONFLICT);
    }

    return this.authService.register(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@User() user: Partial<UserEntity>): { access_token: string } {
    return this.authService.login(user);
  }
}
