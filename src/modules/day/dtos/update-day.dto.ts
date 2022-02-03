import { IsAlphanumeric, Length } from 'class-validator';

export class UpdateDayDto {
  @IsAlphanumeric('ru-RU', { message: 'Только русские буквы' })
  @Length(5, 32, { message: 'Не меньше 5 и не больше 32 символов' })
  name: string;

  //TODO: полноценное обновление
}
