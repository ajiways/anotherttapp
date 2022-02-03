import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Day } from '../day/day.entity';

export enum lessonType {
  lk = 'ЛЕКЦИЯ',
  pz = 'ПРАКТИКА',
  lb = 'ЛАБАРАТОРНАЯ',
}

@Entity('lessons')
export class Lesson extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 32,
  })
  name: string;

  @Column({
    type: 'enum',
    enum: lessonType,
  })
  type: lessonType;

  @Column({
    length: 12,
  })
  time: string;

  @Column({
    length: 56,
  })
  teacherName: string;

  @Column({
    length: 16,
  })
  cabinetNumber: string;

  @ManyToOne(() => Day)
  day: Day;
}
