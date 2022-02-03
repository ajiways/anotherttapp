import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dtos/create-group.dto';
import { GetGroupDto } from './dtos/get-group.dto';
import { UpdateGroupDto } from './dtos/update-group.dto';
import { Group } from './group.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async findAll() {
    return await this.groupRepository.find();
  }

  async getByName(dto: GetGroupDto) {
    const candidate = await this.groupRepository.findOne({
      where: { name: dto.name },
    });

    if (!candidate) {
      throw new HttpException(`Группа не найдена!`, HttpStatus.NOT_FOUND);
    }

    return candidate;
  }

  async findOne(id: number) {
    const result = await this.groupRepository.findOne({ where: { id } });

    if (!result) {
      throw new HttpException(
        `Группа с id ${id} не найдена!`,
        HttpStatus.NOT_FOUND,
      );
    }

    return result;
  }

  async findOneByName(name: string) {
    const result = await this.groupRepository.findOne({ where: { name } });

    if (!result) {
      throw new HttpException(
        `Группа ${name} не найдена!`,
        HttpStatus.NOT_FOUND,
      );
    }

    return result;
  }

  async createGroup(dto: CreateGroupDto) {
    const candidate = await this.groupRepository.findOne({
      where: { name: dto.name },
    });

    if (candidate) {
      throw new HttpException(
        'Группа с таким названием уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.groupRepository.create(dto).save();
  }

  async updateGroup(dto: UpdateGroupDto) {
    const candidate = await this.groupRepository.findOne({
      where: { name: dto.name },
    });

    if (!candidate) {
      throw new HttpException(
        'Группа с таким названием не существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.groupRepository.merge(candidate, dto).save();
  }

  async deleteGroup(id: number) {
    const candidate = await this.findOne(id);

    if (!candidate) {
      throw new HttpException(
        `Группа с id ${id} не найдена!`,
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.groupRepository.delete(id);
  }
}
