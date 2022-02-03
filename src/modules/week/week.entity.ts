import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Day } from '../day/day.entity';
import { Group } from '../group/group.entity';

export enum weekType {
  even = 'EVEN',
  odd = 'ODD',
}

@Entity('weeks')
export class Week extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: weekType,
  })
  type: weekType;

  @OneToMany(() => Day, (day) => day.week)
  days: Day[];

  @ManyToOne(() => Group)
  @JoinColumn()
  group: Group;
}
