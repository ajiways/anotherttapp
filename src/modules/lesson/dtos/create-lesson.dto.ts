import { IsAlphanumeric, IsEnum, Length } from 'class-validator';
import { weekType } from '../../week/week.entity';
import { lessonType } from '../lesson.entity';

export class CreateLessonDto {
  @IsAlphanumeric('ru-RU', { message: 'Только русские буквы' })
  @Length(3, 32, { message: 'От 3 до 32 символов' })
  name: string;

  @IsEnum(lessonType)
  type: lessonType;

  @Length(11, 12, { message: 'Время должно быть в формате: "13:00-13:30"' })
  time: string;

  @IsAlphanumeric('ru-RU', { message: 'Только русские буквы' })
  @Length(3, 32, { message: 'От 3 до 32 символов' })
  teacherName: string;

  @Length(1, 16, { message: 'От 1 до 16 символов' })
  cabinetNumber: string;

  @Length(3, 16, { message: 'От 3 до 16 символов' })
  groupName: string;

  @IsEnum(weekType)
  weekType: weekType;

  @Length(3, 16, { message: 'От 3 до 16 символов' })
  dayName: string;
}
