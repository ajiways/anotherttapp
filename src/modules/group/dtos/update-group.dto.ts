import { Length } from 'class-validator';

export class UpdateGroupDto {
  @Length(3, 16, { message: 'Не менее 3 и не более 16 символов' })
  groupName: string;
}
