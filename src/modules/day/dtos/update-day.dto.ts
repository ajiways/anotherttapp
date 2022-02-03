import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsAlphanumeric,
  IsEnum,
  IsOptional,
  Length,
} from 'class-validator';
import { weekType } from '../../week/week.entity';

export class UpdateDayDto {
  @IsAlphanumeric('ru-RU', { message: 'Только русские буквы' })
  @Length(5, 32, { message: 'Не меньше 5 и не больше 32 символов' })
  name: string;

  @IsOptional()
  @IsAlphanumeric('ru-RU', { message: 'Только русские буквы' })
  @Length(5, 32, { message: 'Не меньше 5 и не больше 32 символов' })
  newName?: string;

  @IsOptional()
  @Type(() => Array)
  @ArrayMinSize(1, { message: 'Должно содержать не менее одного элемента' })
  lessonIds?: number[];

  @IsOptional()
  @Type(() => Array)
  @ArrayMinSize(1, { message: 'Должно содержать не менее одного элемента' })
  lessonsToDeleteIds?: number[];

  @IsOptional()
  @Type(() => Array)
  @ArrayMinSize(1, { message: 'Должно содержать не менее одного элемента' })
  lessonsToAddIds?: number[];

  @Length(3, 16, { message: 'От 3 до 16 символов' })
  groupName: string;

  @IsEnum(weekType, { message: 'Только четное или нечетное' })
  weekType: weekType;
}
