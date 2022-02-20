import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IParams } from '../../interfaces/params.interface';
import { ServiceResponse } from '../../interfaces/service.response';
import { DayService } from '../day/day.service';
import { GroupService } from '../group/group.service';
import { WeekService } from '../week/week.service';
import { CreateLessonDto } from './dtos/create-lesson.dto';
import { DeleteLessonDto } from './dtos/delete-lesson.dto';
import { UpdateLessonDto } from './dtos/update-lessons.dto';
import { Lesson } from './lesson.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    private readonly groupService: GroupService,
    private readonly weekService: WeekService,
    private readonly dayService: DayService,
  ) {}

  private async findMisc(
    dto: CreateLessonDto | UpdateLessonDto | DeleteLessonDto,
  ) {
    const group = await this.groupService.findOneWithParams(
      {
        where: { name: dto.groupName },
      },
      true,
    );

    const week = await this.weekService.findOneWithParams({
      where: { type: dto.weekType, group },
    });

    return await this.dayService.findOneWithParams({
      where: { week, name: dto.dayName },
    });
  }

  async createLesson(dto: CreateLessonDto): Promise<ServiceResponse> {
    const day = await this.findMisc(dto);

    const newLesson = await this.lessonRepository
      .create({
        name: dto.name,
        type: dto.type,
        time: dto.time,
        teacherName: dto.teacherName,
        teacherLastName: dto.teacherLastName,
        cabinetNumber: dto.cabinetNumber,
        day,
      })
      .save();

    let weekType: string;
    if (dto.weekType === 'EVEN') {
      weekType = 'четной';
    } else {
      weekType = 'нечетной';
    }

    return {
      status: HttpStatus.CREATED,
      message: `Пара ${dto.name} успешно добавлена в ${dto.dayName} ${weekType} недели группы ${dto.groupName}`,
      entity: newLesson,
    };
  }

  async updateLesson(dto: UpdateLessonDto): Promise<ServiceResponse> {
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

    const newLesson = await this.lessonRepository.merge(lesson, dto).save();

    return {
      status: HttpStatus.OK,
      message: 'Пара успешно обновлена',
      entity: newLesson,
    };
  }

  async deleteLesson(dto: DeleteLessonDto): Promise<ServiceResponse> {
    const day = await this.findMisc(dto);

    const candidate = await this.lessonRepository.findOne({
      where: { day, name: dto.name },
    });

    if (!candidate) {
      throw new HttpException(`Пара не найдена!`, HttpStatus.BAD_REQUEST);
    }

    await candidate.remove();

    let weekType: string;

    if (dto.weekType === 'EVEN') {
      weekType = 'четной';
    } else {
      weekType = 'нечетной';
    }

    return {
      status: HttpStatus.OK,
      message: `Пара ${dto.name} в ${dto.dayName} ${weekType} недели группы ${dto.groupName} успешно удалена`,
    };
  }

  async findOneWithParams(params: IParams): Promise<Lesson> {
    const result = await this.lessonRepository.findOne({ ...params });

    if (!result) {
      throw new HttpException(
        `Пара с указанными параметрами не найдена!`,
        HttpStatus.NOT_FOUND,
      );
    }

    return result;
  }
}
