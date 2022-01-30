import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll() {
    const result = await this.userRepository.find();

    if (!result) {
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
}
