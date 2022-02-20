import { MigrationInterface, QueryRunner } from 'typeorm';

export class adminUserSeed1645326662732 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `insert into users (login, password, secret, secret_answer, group_id) values ('admin', '$2a$07$Soep6uZbl2EQJ1G4T1H8gez6eQSO/g4L7f0T1AyGF1Ez1Hj9sfF0i', 'Which number is associated with Sevan?', '352', null)`,
    );
    await queryRunner.query(`insert into roles (name) values ('Админ')`);
    await queryRunner.query(
      `insert into user_roles (role_id, user_id) values ((select id from roles where name='Админ'), (select id from users where login='admin'))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`delete from users where login='admin'`);
  }
}
