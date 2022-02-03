import { Type } from 'class-transformer';
import { IsEnum, Min } from 'class-validator';
import { weekType } from '../week.entity';

export class CreateWeekDto {
  @IsEnum(weekType, { message: 'Четный или нечетный тип недели' })
  type: weekType;

  @Type(() => Number)
  @Min(1, { message: 'Айди группы не может быть меньше 1' })
  groupId: number;
}
