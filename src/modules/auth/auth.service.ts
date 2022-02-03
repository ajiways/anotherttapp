import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { LoginDto } from './dtos/login.dto';
import { compare } from 'bcrypt';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private userService: UserService,
  ) {}

  async login(dto: LoginDto) {
    const candidate = await this.userRepository.findOne({
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
        console.log('Success login');
      }
    }
  }

  async register(dto: CreateUserDto) {
    const candidate = await this.userRepository.findOne({
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