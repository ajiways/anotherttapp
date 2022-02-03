import { IsAlphanumeric, IsEnum, Length } from 'class-validator';
import { weekType } from '../../week/week.entity';

export class DeleteLessonDto {
  @IsAlphanumeric('ru-RU', { message: 'Только русские буквы' })
  @Length(3, 32, { message: 'От 3 до 32 символов' })
  name: string;

  @Length(3, 16, { message: 'От 3 до 16 символов' })
  groupName: string;

  @IsEnum(weekType)
  weekType: weekType;

  @Length(3, 16, { message: 'От 3 до 16 символов' })
  dayName: string;
}
