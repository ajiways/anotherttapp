import { MigrationInterface, QueryRunner } from 'typeorm';

export class addTokenEntity1645417147253 implements MigrationInterface {
  name = 'addTokenEntity1645417147253';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user_roles" DROP CONSTRAINT "FK_80cbdae6b0c0935b3ce38f3bd1f"
        `);
    await queryRunner.query(`
            ALTER TABLE "user_roles" DROP CONSTRAINT "FK_7fccdf1418db0c59671e3f66f5e"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_80cbdae6b0c0935b3ce38f3bd1"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_7fccdf1418db0c59671e3f66f5"
        `);
    await queryRunner.query(`
            CREATE TABLE "tokens" (
                "id" SERIAL NOT NULL,
                "refresh_token" character varying NOT NULL,
                "user_id" integer,
                CONSTRAINT "REL_8769073e38c365f315426554ca" UNIQUE ("user_id"),
                CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "roles"
            ADD CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_b23c65e50a758245a33ee35fda" ON "user_roles" ("role_id")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_87b8888186ca9769c960e92687" ON "user_roles" ("user_id")
        `);
    await queryRunner.query(`
            ALTER TABLE "tokens"
            ADD CONSTRAINT "FK_8769073e38c365f315426554ca5" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "user_roles"
            ADD CONSTRAINT "FK_b23c65e50a758245a33ee35fda1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "user_roles"
            ADD CONSTRAINT "FK_87b8888186ca9769c960e926870" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user_roles" DROP CONSTRAINT "FK_87b8888186ca9769c960e926870"
        `);
    await queryRunner.query(`
            ALTER TABLE "user_roles" DROP CONSTRAINT "FK_b23c65e50a758245a33ee35fda1"
        `);
    await queryRunner.query(`
            ALTER TABLE "tokens" DROP CONSTRAINT "FK_8769073e38c365f315426554ca5"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_87b8888186ca9769c960e92687"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_b23c65e50a758245a33ee35fda"
        `);
    await queryRunner.query(`
            ALTER TABLE "roles" DROP CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7"
        `);
    await queryRunner.query(`
            DROP TABLE "tokens"
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_7fccdf1418db0c59671e3f66f5" ON "user_roles" ("user_id")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_80cbdae6b0c0935b3ce38f3bd1" ON "user_roles" ("role_id")
        `);
    await queryRunner.query(`
            ALTER TABLE "user_roles"
            ADD CONSTRAINT "FK_7fccdf1418db0c59671e3f66f5e" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "user_roles"
            ADD CONSTRAINT "FK_80cbdae6b0c0935b3ce38f3bd1f" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
  }
}
