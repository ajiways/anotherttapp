import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Day } from './day.entity';
import { CreateDayDto } from './dtos/create-day.dto';
import { UpdateDayDto } from './dtos/update-day.dto';

@Injectable()
export class DayService {
  constructor(
    @InjectRepository(Day) private readonly dayRepository: Repository<Day>,
  ) {}

  async findAll() {
    return await this.dayRepository.find();
  }

  async findOne(id: number) {
    const result = await this.dayRepository.findOne({ where: { id } });

    if (!result) {
      throw new HttpException(
        `День с id ${id} не найден!`,
        HttpStatus.NOT_FOUND,
      );
    }

    return result;
  }

  async deleteDay(id: number) {
    const toDelete = await this.findOne(id);

    if (!toDelete) {
      throw new HttpException(
        `День с id ${id} не найден!`,
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.dayRepository.delete(id);
  }

  async createDay(dto: CreateDayDto) {
    return await this.dayRepository.create(dto).save();
    // TODO: Реализовать нормальное создание
  }

  async updateDay(dto: UpdateDayDto) {
    const day = await this.dayRepository.findOne({ where: { name: dto.name } });

    if (!day) {
      throw new HttpException(
        `День для обновления не найден!`,
        HttpStatus.NOT_FOUND,
      );
    }

    // TODO: Реализовать нормальное обновление
    return await this.dayRepository.merge(day, dto).save();
  }
}
