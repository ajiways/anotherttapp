import { MigrationInterface, QueryRunner } from 'typeorm';

export class changes1644769794225 implements MigrationInterface {
  name = 'changes1644769794225';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_b8d62b3714f81341caa13ab0ff0"
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_b8d62b3714f81341caa13ab0ff0" UNIQUE ("group_id")
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_b8d62b3714f81341caa13ab0ff0" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_b8d62b3714f81341caa13ab0ff0"
        `);
    await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_b8d62b3714f81341caa13ab0ff0"
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_b8d62b3714f81341caa13ab0ff0" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }
}
