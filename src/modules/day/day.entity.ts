import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Lesson } from '../lesson/lesson.entity';
import { Week } from '../week/week.entity';

@Entity('days')
export class Day extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 32,
  })
  name: string;

  @ManyToOne(() => Week)
  @JoinColumn()
  week: Week;

  @OneToMany(() => Lesson, (lesson) => lesson.day)
  lessons: Lesson[];
}
