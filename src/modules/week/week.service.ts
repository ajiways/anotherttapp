import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from '../group/group.entity';
import { CreateWeekDto } from './dtos/create-week.dto';
import { DeleteWeekDto } from './dtos/delete-week.dto';
import { GetWeekDto } from './dtos/get-week.dto';
import { UpdateWeekDto } from './dtos/update-week.dto';
import { Week } from './week.entity';

@Injectable()
export class WeekService {
  constructor(
    @InjectRepository(Week)
    private readonly weekRepository: Repository<Week>,
  ) {}

  private async findGroup(
    dto: CreateWeekDto | UpdateWeekDto | DeleteWeekDto | GetWeekDto,
  ) {
    const result = await Group.findOne({ where: { id: dto.groupId } });

    if (!result) {
      throw new HttpException(
        `Группа с id ${dto.groupId} не найдена`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return result;
  }

  async findAll() {
    return await this.weekRepository.find();
  }

  async findOne(id: number) {
    const result = await this.weekRepository.findOne({ where: { id } });

    if (!result) {
      throw new HttpException(
        `Пара с id ${id} не найдена!`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return result;
  }

  async createWeek(dto: CreateWeekDto) {
    const group = await this.findGroup(dto);

    return await this.weekRepository
      .create({
        group,
        type: dto.type,
      })
      .save();
  }

  async updateWeek(dto: UpdateWeekDto) {
    const group = await this.findGroup(dto);

    const week = await this.weekRepository.findOne({
      where: { group, type: dto.type },
    });

    if (!week) {
      throw new HttpException(
        'Такая неделя не существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.weekRepository
      .merge(week, {
        type: dto.newType,
      })
      .save();

    // TODO: Подумать над нормальной реализацией обновления сущностей
  }

  async deleteWeek(dto: DeleteWeekDto) {
    const group = await this.findGroup(dto);

    const candidate = await this.weekRepository.findOne({
      where: { group, type: dto.type },
    });

    if (!candidate) {
      throw new HttpException(`Неделя не найдена!`, HttpStatus.BAD_REQUEST);
    }

    return await candidate.remove();
  }
}
