import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 16,
    unique: true,
  })
  login: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  secret: string;

  @Column({
    nullable: true,
  })
  secretAnswer: string;
}
