import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IParams } from '../../interfaces/params.interface';
import { ServiceResponse } from '../../interfaces/service.response';
import { GroupService } from '../group/group.service';
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
    @Inject(forwardRef(() => GroupService)) private groupService: GroupService,
  ) {}

  private async findGroup(
    dto: CreateWeekDto | UpdateWeekDto | DeleteWeekDto | GetWeekDto,
  ) {
    const result = await this.groupService.findOneWithParams({
      where: { id: dto.groupId },
    });

    if (!result) {
      throw new HttpException(
        `Группа с id ${dto.groupId} не найдена`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return result;
  }

  private checkType(dto: CreateWeekDto | DeleteWeekDto | UpdateWeekDto) {
    if (dto.type === 'EVEN') {
      return 'четная';
    } else {
      return 'нечетная';
    }
  }

  async createWeek(dto: CreateWeekDto): Promise<ServiceResponse> {
    const group = await this.findGroup(dto);

    await this.weekRepository
      .create({
        group,
        type: dto.type,
      })
      .save();

    const weekType = this.checkType(dto);

    return {
      status: HttpStatus.CREATED,
      message: `${weekType} неделя успешно добавлена группе ${group.name}`,
    };
  }

  async updateWeek(dto: UpdateWeekDto): Promise<ServiceResponse> {
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

    const result = await this.weekRepository
      .merge(week, {
        type: dto.newType,
      })
      .save();

    const weekType = this.checkType(dto);

    return {
      status: HttpStatus.OK,
      message: `${weekType} неделя успешно обновлена у группы ${group.name}`,
      entity: result,
    };

    // TODO: Подумать над нормальной реализацией обновления сущностей
  }

  async deleteWeek(dto: DeleteWeekDto): Promise<ServiceResponse> {
    const group = await this.findGroup(dto);

    const candidate = await this.weekRepository.findOne({
      where: { group, type: dto.type },
    });

    if (!candidate) {
      throw new HttpException(`Неделя не найдена!`, HttpStatus.BAD_REQUEST);
    }

    await candidate.remove();

    const weekType = this.checkType(dto);

    return {
      status: HttpStatus.OK,
      message: `${weekType} неделя была успешно удалена из ${group.name}`,
    };
  }

  async findAllWithParams(
    params: IParams,
    relations: boolean,
  ): Promise<Week[]> {
    let result: Week[];

    if (relations) {
      result = await this.weekRepository.find({
        ...params,
        relations: ['days'],
      });
    } else {
      result = await this.weekRepository.find({ ...params });
    }

    if (!result.length) {
      throw new HttpException(
        'Недели с указанными параметрами не найдены!',
        HttpStatus.NOT_FOUND,
      );
    }

    return result;
  }

  async findOneWithParams(params: IParams): Promise<Week> {
    const result = await this.weekRepository.findOne({ ...params });

    if (!result) {
      throw new HttpException(
        'Неделя с указанными параметрами не найдена!',
        HttpStatus.NOT_FOUND,
      );
    }

    return result;
  }
}
