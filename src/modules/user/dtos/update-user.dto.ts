import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'Поле должно быть строкой' })
  @Length(3, 16, { message: 'От 3 до 16 символов' })
  login?: string;

  @IsOptional()
  @IsString({ message: 'Поле должно быть строкой' })
  @Length(6, 16, { message: 'От 6 до 16 символов' })
  password?: string;

  @IsOptional()
  @IsString({ message: 'Поле должно быть строкой' })
  @Length(6, 32, { message: 'От 2 до 32 символов' })
  secret?: string;

  @IsOptional()
  @IsString({ message: 'Поле должно быть строкой' })
  @Length(2, 16, { message: 'От 2 до 16 символов' })
  secretAnswer?: string;
}
