import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
import { hash } from 'bcrypt';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Group } from '../group/group.entity';
import { GroupService } from '../group/group.service';
import { IParams } from '../../interfaces/params.interface';

@Injectable()
export class UserService {
  @Inject()
  private readonly groupService: GroupService;

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
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
    return await this.userRepository.find();
  }

  async findOneWithParams(params: IParams) {
    return await this.userRepository.findOne({ ...params });
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
    const candidate = await this.findOneWithParams({
      where: { login: dto.login },
    });

    if (candidate) {
      throw new HttpException(
        `Пользователь с логином ${dto.login} уже зарегистрирован`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const group = await this.groupService.findOneWithParams({
      where: { id: dto.groupId },
    });

    this.checkSecret(dto);

    const hashedPassword = await hash(dto.password, 7);

    return await this.userRepository
      .create({
        login: dto.login,
        group,
        password: hashedPassword,
      })
      .save();
  }

  async deleteUser(id: number) {
    await this.findOne(id);

    await this.userRepository.delete(id);

    return { message: `Пользователь с id ${id} был удален` };
  }

  async updateUser(dto: UpdateUserDto) {
    const candidate = await this.findOneWithParams({
      where: { login: dto.login },
    });
    let group: Group;

    if (!candidate) {
      throw new HttpException(`Пользователь не найден`, HttpStatus.NOT_FOUND);
    }

    if (dto.groupId) {
      group = await this.groupService.findOneWithParams({
        where: { id: dto.groupId },
      });
    }

    if (dto.password) {
      const hashedPassword = await hash(dto.password, 7);
      dto.password = hashedPassword;
    }

    this.checkSecret(dto);

    return await this.userRepository
      .merge(candidate, {
        login: dto.login,
        password: dto.password,
        secret: dto.secret,
        secretAnswer: dto.secretAnswer,
        group,
      })
      .save();
  }
}
