import { Type } from 'class-transformer';
import { Length } from 'class-validator';

export class GetDays {
  @Type(() => String)
  @Length(1, 16, { message: 'Минимум 1 и максимум 16 символов' })
  groupName: string;
}
