import { Type } from 'class-transformer';
import { IsOptional, IsString, Length, Min } from 'class-validator';

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

  @IsOptional()
  @Type(() => Number)
  @Min(1, { message: 'Id новой группы не может быть меньше 1' })
  groupId: number;
}
