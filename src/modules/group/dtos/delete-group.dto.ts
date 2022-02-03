import { Length } from 'class-validator';

export class DeleteGroupDto {
  @Length(3, 16, { message: 'Не менее 3 и не более 16 символов' })
  name: string;
}
