import { MigrationInterface, QueryRunner } from 'typeorm';

export class allEntities1643971888481 implements MigrationInterface {
  name = 'allEntities1643971888481';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."lessons_type_enum" AS ENUM('ЛЕКЦИЯ', 'ПРАКТИКА', 'ЛАБАРАТОРНАЯ')
        `);
    await queryRunner.query(`
            CREATE TABLE "lessons" (
                "id" SERIAL NOT NULL,
                "name" character varying(32) NOT NULL,
                "type" "public"."lessons_type_enum" NOT NULL,
                "time" character varying(12) NOT NULL,
                "teacher_name" character varying(56) NOT NULL,
                "cabinet_number" character varying(16) NOT NULL,
                "day_id" integer,
                CONSTRAINT "PK_9b9a8d455cac672d262d7275730" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "groups" (
                "id" SERIAL NOT NULL,
                "name" character varying(16) NOT NULL,
                CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."weeks_type_enum" AS ENUM('EVEN', 'ODD')
        `);
    await queryRunner.query(`
            CREATE TABLE "weeks" (
                "id" SERIAL NOT NULL,
                "type" "public"."weeks_type_enum" NOT NULL,
                "group_id" integer,
                CONSTRAINT "PK_003488ee2ca80ef0c85a02a8065" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "days" (
                "id" SERIAL NOT NULL,
                "name" character varying(32) NOT NULL,
                "week_id" integer,
                CONSTRAINT "PK_c2c66eb46534bea34ba48cc4d7f" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "group_id" integer
        `);
    await queryRunner.query(`
            ALTER TABLE "lessons"
            ADD CONSTRAINT "FK_94b34c75b9db93532390f98c646" FOREIGN KEY ("day_id") REFERENCES "days"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "weeks"
            ADD CONSTRAINT "FK_84b5fd1019c0215403f15e83084" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "days"
            ADD CONSTRAINT "FK_05d53f1cf969e283c37f736ce39" FOREIGN KEY ("week_id") REFERENCES "weeks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
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
            ALTER TABLE "days" DROP CONSTRAINT "FK_05d53f1cf969e283c37f736ce39"
        `);
    await queryRunner.query(`
            ALTER TABLE "weeks" DROP CONSTRAINT "FK_84b5fd1019c0215403f15e83084"
        `);
    await queryRunner.query(`
            ALTER TABLE "lessons" DROP CONSTRAINT "FK_94b34c75b9db93532390f98c646"
        `);
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "group_id"
        `);
    await queryRunner.query(`
            DROP TABLE "days"
        `);
    await queryRunner.query(`
            DROP TABLE "weeks"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."weeks_type_enum"
        `);
    await queryRunner.query(`
            DROP TABLE "groups"
        `);
    await queryRunner.query(`
            DROP TABLE "lessons"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."lessons_type_enum"
        `);
  }
}
