import * as path from 'path';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { createTypeOrmOptions } from './typeorm.factory';
import { config } from 'dotenv';
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';

config({ path: path.join(__dirname, '..', '..', 'common', 'envs', '.env') });

export default new DataSource({
  ...createTypeOrmOptions(new ConfigService()),
} as DataSourceOptions);
