import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Week } from '../week/week.entity';

@Entity('groups')
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 16,
  })
  name: string;

  @OneToOne(() => User)
  headman: User;

  @OneToMany(() => Week, (week) => week.group)
  weeks: Week[];
}
