import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRoleEntity1645322543991 implements MigrationInterface {
  name = 'addRoleEntity1645322543991';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "roles" (
                "id" SERIAL NOT NULL,
                "name" character varying(16) UNIQUE NOT NULL,
                CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "user_roles" (
                "role_id" integer NOT NULL,
                "user_id" integer NOT NULL,
                CONSTRAINT "PK_7ac85692ad818b3c93adc8c5392" PRIMARY KEY ("role_id", "user_id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_80cbdae6b0c0935b3ce38f3bd1" ON "user_roles" ("role_id")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_7fccdf1418db0c59671e3f66f5" ON "user_roles" ("user_id")
        `);
    await queryRunner.query(`
            ALTER TABLE "user_roles"
            ADD CONSTRAINT "FK_80cbdae6b0c0935b3ce38f3bd1f" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "user_roles"
            ADD CONSTRAINT "FK_7fccdf1418db0c59671e3f66f5e" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user_roles" DROP CONSTRAINT "FK_7fccdf1418db0c59671e3f66f5e"
        `);
    await queryRunner.query(`
            ALTER TABLE "user_roles" DROP CONSTRAINT "FK_80cbdae6b0c0935b3ce38f3bd1f"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_7fccdf1418db0c59671e3f66f5"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_80cbdae6b0c0935b3ce38f3bd1"
        `);
    await queryRunner.query(`
            DROP TABLE "user_roles"
        `);
    await queryRunner.query(`
            DROP TABLE "roles"
        `);
  }
}
