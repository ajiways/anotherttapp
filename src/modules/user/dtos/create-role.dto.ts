import { Length } from 'class-validator';

export class CreateRoleDto {
  @Length(2, 16, { message: 'Название роли должно быть от 2 до 16 символов' })
  name: string;
}
