import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserEntity1643580565399 implements MigrationInterface {
  name = 'UserEntity1643580565399';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "login" character varying(16) NOT NULL,
                "password" character varying NOT NULL,
                "secret" character varying(56),
                "secret_answer" character varying(56),
                "registered_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c" UNIQUE ("login"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "users"
        `);
  }
}
