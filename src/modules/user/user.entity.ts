import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
    length: 56,
    default: null,
  })
  secret: string;

  @Column({
    nullable: true,
    length: 56,
    default: null,
  })
  secretAnswer: string;

  @CreateDateColumn()
  registeredAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
