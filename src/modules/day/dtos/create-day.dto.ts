import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsAlphanumeric,
  IsEnum,
  IsOptional,
  Length,
} from 'class-validator';
import { weekType } from '../../week/week.entity';

export enum weekDayNames {
  monday = 'Понедельник',
  tuesday = 'Вторник',
  wednesday = 'Среда',
  thursday = 'Четверг',
  friday = 'Пятница',
  saturday = 'Суббота',
  sunday = 'Воскресенье',
}

export class CreateDayDto {
  @IsAlphanumeric('ru-RU', { message: 'Только русские буквы' })
  @Length(5, 32, { message: 'Не меньше 5 и не больше 32 символов' })
  name: string;

  @Length(3, 16, { message: 'От 3 до 16 символов' })
  groupName: string;

  @IsEnum(weekType, { message: 'Только четное или нечетное' })
  weekType: weekType;

  @IsOptional()
  @Type(() => Array)
  @ArrayMinSize(1) // TODO: Попробовать нормально реализовать этот момент
  lessons?: number[];
}
