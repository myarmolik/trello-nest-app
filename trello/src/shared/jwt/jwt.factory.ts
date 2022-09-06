import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';

async function createJwtOptions(
  config: ConfigService,
): Promise<JwtModuleOptions> {
  return {
    secret: config.get('JWT_KEY') || 'key',
    signOptions: { expiresIn: config.get('JWT_EXPIRES') || '365d' },
  };
}

export const jwtFactory = {
  inject: [ConfigService],
  useFactory: createJwtOptions,
};
