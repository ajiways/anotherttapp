import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IParams } from '../../interfaces/params.interface';
import { Group } from '../group/group.entity';
import { Week } from '../week/week.entity';
import { Day } from './day.entity';
import { CreateDayDto } from './dtos/create-day.dto';
import { DeleteDayDto } from './dtos/delete-day.dto';
import { UpdateDayDto } from './dtos/update-day.dto';

@Injectable()
export class DayService {
  constructor(
    @InjectRepository(Day) private readonly dayRepository: Repository<Day>,
  ) {}

  private async findMisc(dto: CreateDayDto | UpdateDayDto | DeleteDayDto) {
    const group = await Group.findOne({
      where: { name: dto.groupName },
    });

    const week = await Week.findOne({
      where: { type: dto.weekType, group },
    });

    const day = await this.findOneWithParams({
      where: { week, name: dto.name },
    });

    return {
      group,
      week,
      day,
    };
  }

  async findAll() {
    return await this.dayRepository.find();
  }

  async deleteDay(dto: DeleteDayDto) {
    return await (await this.findMisc(dto)).day.remove();
  }

  async createDay(dto: CreateDayDto) {
    const tempStore = await this.findMisc(dto);

    return await this.dayRepository
      .create({
        name: tempStore.day.name,
        week: tempStore.week,
        lessons: [],
      })
      .save();
  }

  async updateDay(dto: UpdateDayDto) {
    throw new HttpException(
      'Пока не реализовано',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    // TODO: Попытаться это реализовать
  }

  async findAllWithParams(params: IParams) {
    const result = await this.dayRepository.find({ ...params });

    if (!result) {
      throw new HttpException(
        'Дни с указанными параметрами не найдены',
        HttpStatus.NOT_FOUND,
      );
    }

    return result;
  }

  async findOneWithParams(params: IParams) {
    const result = await this.dayRepository.findOne({ ...params });

    if (!result) {
      throw new HttpException(
        `День с указанными параметрами не найден!`,
        HttpStatus.NOT_FOUND,
      );
    }

    return result;
  }
}
