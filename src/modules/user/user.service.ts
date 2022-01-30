import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
import { hash } from 'bcrypt';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  private checkSecret(dto: CreateUserDto | UpdateUserDto) {
    if (dto.secret && !dto.secretAnswer) {
      throw new HttpException(
        'Укажите ответ на секретный вопрос',
        HttpStatus.BAD_REQUEST,
      );
    } else if (!dto.secret && dto.secretAnswer) {
      throw new HttpException(
        'Укажите секретный вопрос',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    const result = await this.userRepository.find();

    if (!result.length) {
      throw new HttpException('Пользователи не найдены', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async findOne(id: number) {
    const result = await this.userRepository.findOne({ where: { id } });

    if (!result) {
      throw new HttpException(
        `Пользователь с id ${id} не найден!`,
        HttpStatus.NOT_FOUND,
      );
    }

    return result;
  }

  async createUser(dto: CreateUserDto) {
    const candidate = await this.userRepository.findOne({
      where: { login: dto.login },
    });

    if (candidate) {
      throw new HttpException(
        `Пользователь с логином ${dto.login} уже зарегистрирован`,
        HttpStatus.BAD_REQUEST,
      );
    }

    this.checkSecret(dto);

    const hashedPassword = await hash(dto.password, 7);

    return await this.userRepository
      .create({
        login: dto.login,
        password: hashedPassword,
      })
      .save();
  }

  async deleteUser(id: number) {
    const candidate = await this.userRepository.findOne({ where: { id } });

    if (!candidate) {
      throw new HttpException(
        `Пользователь с id ${id} не найден`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.userRepository.delete(id);

    return { message: `Пользователь с id ${id} был удален` };
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    const candidate = await this.userRepository.findOne({ where: { id } });

    if (!candidate) {
      throw new HttpException(
        `Пользователь с id ${id} не найден`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (dto.password) {
      const hashedPassword = await hash(dto.password, 7);
      dto.password = hashedPassword;
    }

    this.checkSecret(dto);

    return await this.userRepository.merge(candidate, dto).save();
  }
}
