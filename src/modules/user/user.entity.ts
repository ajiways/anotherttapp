import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Group } from '../group/group.entity';

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

  @OneToOne(() => Group)
  @JoinColumn()
  group: Group;
}
