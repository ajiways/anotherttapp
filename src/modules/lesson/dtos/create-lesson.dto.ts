import { IsAlphanumeric, IsEnum, Length } from 'class-validator';
import { weekType } from '../../week/week.entity';
import { lessonType } from '../lesson.entity';

export class CreateLessonDto {
  @IsAlphanumeric('ru-RU', { message: 'Только русские буквы' })
  @Length(3, 32, { message: 'От 3 до 32 символов' })
  name: string;

  @IsEnum(lessonType, {
    message:
      'Правильно укажите тип занятия: "ЛЕКЦИЯ", "ПРАКТИКА", "ЛАБАРАТОРНАЯ"',
  })
  type: lessonType;

  @Length(11, 12, { message: 'Время должно быть в формате: "13:00-13:30"' })
  time: string;

  @IsAlphanumeric('ru-RU', { message: 'Только русские буквы' })
  @Length(3, 32, { message: 'От 3 до 32 символов' })
  teacherName: string;

  @IsAlphanumeric('ru-RU', { message: 'Только русские буквы' })
  @Length(3, 32, { message: 'От 3 до 32 символов' })
  teacherLastName: string;

  @Length(1, 16, { message: 'От 1 до 16 символов' })
  cabinetNumber: string;

  @Length(3, 16, { message: 'От 3 до 16 символов' })
  groupName: string;

  @IsEnum(weekType, { message: 'Только EVEN и ODD' })
  weekType: weekType;

  @Length(3, 16, { message: 'От 3 до 16 символов' })
  dayName: string;
}
