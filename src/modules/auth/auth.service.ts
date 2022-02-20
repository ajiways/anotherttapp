import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { compare } from 'bcrypt';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';
import {
  IAccessPayload,
  IRefreshPayload,
} from '../token/interfaces/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
  ) {}

  async login(dto: LoginDto, agent: string) {
    const candidate = await this.userService.findOneWithParams(
      {
        where: { login: dto.login },
      },
      { relations: ['roles'] },
    );

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
        console.log(candidate);

        const roleNamesArr: string[] = candidate.roles.map((role) => {
          return role.name;
        });

        const accessPayload: IAccessPayload = {
          id: candidate.id,
          password: candidate.password,
          roles: [...roleNamesArr],
        };

        const refreshPayload: IRefreshPayload = {
          agent,
          date: Date.now(),
        };

        return {
          message: 'Успешный вход',
          tokens: this.tokenService.generateTokens(
            accessPayload,
            refreshPayload,
          ),
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
