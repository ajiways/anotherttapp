import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Поле не должно быть пустым' })
  @IsString({ message: 'Поле должно быть строкой' })
  @Length(3, 16, { message: 'От 3 до 16 символов' })
  login: string;

  @IsNotEmpty({ message: 'Поле не должно быть пустым' })
  @IsString({ message: 'Поле должно быть строкой' })
  @Length(6, 16, { message: 'От 6 до 16 символов' })
  password: string;
}
