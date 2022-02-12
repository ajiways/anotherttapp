import { Type } from 'class-transformer';
import { Min } from 'class-validator';

export class GetDays {
  @Type(() => Number)
  @Min(1, { message: 'Айди группы не может быть меньше чем 1' })
  groupId: number;
}
