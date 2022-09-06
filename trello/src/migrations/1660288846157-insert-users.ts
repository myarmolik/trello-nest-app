import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class insertUsers1660288846157 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const sql =
      'INSERT INTO "user" ("email", "password", "isAdmin") VALUES ($1, $2, $3)';
    queryRunner.query(sql, [
      'admin@gmail.com',
      await bcrypt.hash('admin', 8),
      true,
    ]);
    await queryRunner.query(sql, [
      'user@gmail.com',
      await bcrypt.hash('user', 8),
      false,
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM "user"');
  }
}
