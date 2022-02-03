import { IsAlphanumeric, IsEnum, Length } from 'class-validator';
import { weekType } from '../../week/week.entity';

export class DeleteDayDto {
  @IsAlphanumeric('ru-RU', { message: 'Только русские буквы' })
  @Length(5, 32, { message: 'Не меньше 5 и не больше 32 символов' })
  name: string;

  @Length(3, 16, { message: 'От 3 до 16 символов' })
  groupName: string;

  @IsEnum(weekType, { message: 'Только четное или нечетное' })
  weekType: weekType;
}
