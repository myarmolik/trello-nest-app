import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { E_UNAUTHORIZED } from '../../../common/exceptions';
import { User } from '../../users/entities/users.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<Partial<User>> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException(E_UNAUTHORIZED);
    }
    return user;
  }
}
