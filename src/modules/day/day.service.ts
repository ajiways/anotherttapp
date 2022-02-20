import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IParams } from '../../interfaces/params.interface';
import { ServiceResponse } from '../../interfaces/service.response';
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

  async findAll(): Promise<ServiceResponse<Day>> {
    const result = await this.dayRepository.find();

    return {
      status: HttpStatus.OK,
      message: 'Успешно!',
      entities: result,
    };
  }

  async deleteDay(dto: DeleteDayDto): Promise<ServiceResponse> {
    const misc = await this.findMisc(dto);
    await misc.day.remove();

    let weekType: string;

    if (dto.weekType === 'EVEN') {
      weekType = 'четную';
    } else {
      weekType = 'нечетную';
    }

    return {
      status: HttpStatus.OK,
      message: `${dto.name} успешно удален из ${weekType} недели группы ${misc.group.name}`,
    };
  }

  async createDay(dto: CreateDayDto): Promise<ServiceResponse> {
    const group = await Group.findOne({ where: { name: dto.groupName } });

    if (!group) {
      throw new HttpException(
        `Группа ${dto.groupName} не найдена`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const week = await Week.findOne({
      where: { type: dto.weekType, group: group },
    });

    if (!week) {
      throw new HttpException(
        `У группы ${dto.groupName} нет недели с типом ${dto.weekType}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newDay = await this.dayRepository
      .create({
        name: dto.name,
        week: week,
        lessons: [],
      })
      .save();

    let weekType: string;

    if (dto.weekType === 'EVEN') {
      weekType = 'четную';
    } else {
      weekType = 'нечетную';
    }

    return {
      status: HttpStatus.CREATED,
      message: `День ${dto.name} успешно добавлен в ${weekType} неделю группы ${dto.groupName}`,
      entity: newDay,
    };
  }

  async updateDay(dto: UpdateDayDto): Promise<void> {
    throw new HttpException(
      'Пока не реализовано',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    // TODO: Попытаться это реализовать
  }

  async findAllWithParams(params: IParams): Promise<Day[]> {
    const result = await this.dayRepository.find({ ...params });

    if (!result) {
      throw new HttpException(
        'Дни с указанными параметрами не найдены',
        HttpStatus.NOT_FOUND,
      );
    }

    return result;
  }

  async findOneWithParams(params: IParams): Promise<Day> {
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
