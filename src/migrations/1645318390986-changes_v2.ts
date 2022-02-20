import { MigrationInterface, QueryRunner } from 'typeorm';

export class changesV21645318390986 implements MigrationInterface {
  name = 'changesV21645318390986';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "lessons"
            ADD "teacher_last_name" character varying(56) NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "lessons" DROP COLUMN "teacher_last_name"
        `);
  }
}
