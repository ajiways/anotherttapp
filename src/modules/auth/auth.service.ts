import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { compare } from 'bcrypt';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';
import { IPayload } from '../token/interfaces/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

  async login(dto: LoginDto) {
    const candidate = await this.userService.findOneWithParams({
      where: { login: dto.login },
    });

    if (!candidate) {
      throw new HttpException(
        'Неправильный логин или пароль',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const isMatch = await compare(dto.password, candidate.password);

      if (!isMatch) {
        throw new HttpException(
          'Неправильный логин или пароль',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const payload: IPayload = {
          id: candidate.id,
          password: candidate.password,
        };

        return {
          message: 'Успешный вход',
          token: this.tokenService.generateToken(payload),
        };
      }
    }
  }

  async register(dto: CreateUserDto) {
    const candidate = await this.userService.findOneWithParams({
      where: { login: dto.login },
    });

    if (candidate) {
      throw new HttpException(
        `Пользователь с логином ${dto.login} уже зарегистрирован`,
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return await this.userService.createUser(dto);
    }
  }
}
