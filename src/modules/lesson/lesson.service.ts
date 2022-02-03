import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Day } from '../day/day.entity';
import { Group } from '../group/group.entity';
import { Week } from '../week/week.entity';
import { CreateLessonDto } from './dtos/create-lesson.dto';
import { DeleteLessonDto } from './dtos/delete-lesson.dto';
import { UpdateLessonDto } from './dtos/update-lessons.dto';
import { Lesson } from './lesson.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}

  private async findMisc(
    dto: CreateLessonDto | UpdateLessonDto | DeleteLessonDto,
  ) {
    const group = await Group.findOne({
      where: { name: dto.groupName },
    });

    const week = await Week.findOne({
      where: { type: dto.weekType, group },
    });

    return await Day.findOne({ where: { week, name: dto.dayName } });
  }

  async findAll() {
    return await this.lessonRepository.find();
  }

  async findOne(id: number) {
    const result = await this.lessonRepository.findOne({ where: { id } });

    if (!result) {
      throw new HttpException(
        `Пара с id ${id} не найдена!`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return result;
  }

  async createLesson(dto: CreateLessonDto) {
    const day = await this.findMisc(dto);

    return await this.lessonRepository
      .create({
        name: dto.name,
        type: dto.type,
        time: dto.time,
        teacherName: dto.teacherName,
        cabinetNumber: dto.cabinetNumber,
        day,
      })
      .save();
  }

  async updateLesson(dto: UpdateLessonDto) {
    const day = await this.findMisc(dto);

    const lesson = await this.lessonRepository.findOne({
      where: { day, name: dto.name },
    });

    if (!lesson) {
      throw new HttpException(
        'Пара с таким названием не существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.lessonRepository.merge(lesson, dto).save();
  }

  async deleteLesson(dto: DeleteLessonDto) {
    const day = await this.findMisc(dto);

    const candidate = await this.lessonRepository.findOne({
      where: { day, name: dto.name },
    });

    if (!candidate) {
      throw new HttpException(`Пара не найдена!`, HttpStatus.BAD_REQUEST);
    }

    return await candidate.remove();
  }
}
