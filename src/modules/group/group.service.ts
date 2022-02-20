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
import { DayService } from '../day/day.service';
import { weekDayNames } from '../day/dtos/create-day.dto';
import { GetDays } from '../group/dtos/get-days.dto';
import { Week, weekType } from '../week/week.entity';
import { WeekService } from '../week/week.service';
import { CreateGroupDto } from './dtos/create-group.dto';
import { DeleteGroupDto } from './dtos/delete-group.dto';
import { UpdateGroupDto } from './dtos/update-group.dto';
import { Group } from './group.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @Inject(forwardRef(() => WeekService)) private weekService: WeekService,
    private readonly dayService: DayService,
  ) {}

  private async fillWeek(group: Group, weekType: weekType) {
    const dayNames = [
      weekDayNames.monday,
      weekDayNames.tuesday,
      weekDayNames.wednesday,
      weekDayNames.thursday,
      weekDayNames.friday,
      weekDayNames.saturday,
    ];

    await Promise.all(
      dayNames.map(async (name) => {
        await this.dayService.createDay({
          groupName: group.name,
          name,
          weekType,
        });
      }),
    );
  }

  async findAll(): Promise<ServiceResponse<Group>> {
    const result = await this.groupRepository.find();

    return {
      status: HttpStatus.OK,
      message: 'Успешно!',
      entities: result,
    };
  }

  async createGroup(dto: CreateGroupDto): Promise<ServiceResponse> {
    const candidate = await this.findOneWithParams(
      {
        where: { name: dto.groupName },
      },
      false,
    );

    if (candidate) {
      throw new HttpException(
        'Группа с таким названием уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const grp = await this.groupRepository
      .create({ name: dto.groupName })
      .save();

    await this.weekService.createWeek({
      type: weekType.even,
      groupId: grp.id,
    });

    await this.weekService.createWeek({
      type: weekType.odd,
      groupId: grp.id,
    });

    await this.fillWeek(grp, weekType.even);
    await this.fillWeek(grp, weekType.odd);

    return {
      status: HttpStatus.CREATED,
      message: `Группа ${dto.groupName} успешно создана`,
      entity: grp,
    };
  }

  async updateGroup(dto: UpdateGroupDto): Promise<ServiceResponse> {
    const candidate = await this.findOneWithParams({
      where: { name: dto.groupName },
    });

    await this.groupRepository.merge(candidate, { name: dto.groupName }).save();

    return {
      status: HttpStatus.OK,
      message: `Группа ${candidate.name} успешно переименована на ${dto.groupName}`,
    };
  }

  async deleteGroup(dto: DeleteGroupDto): Promise<ServiceResponse> {
    const grp = await this.findOneWithParams({
      where: { name: dto.groupName },
    });
    await grp.remove();

    return {
      status: HttpStatus.OK,
      message: `Группа ${grp.name} успешно удалена`,
    };
  }

  async findOneWithParams(params: IParams, err?: boolean): Promise<Group> {
    const result = await this.groupRepository.findOne({ ...params });

    if (err) {
      if (!result) {
        throw new HttpException(
          `Группа с указанными параметрами не найдена!`,
          HttpStatus.NOT_FOUND,
        );
      }
    }

    return result;
  }

  async getWeeksByGroupName(dto: GetDays): Promise<ServiceResponse<Week>> {
    const grp = await this.groupRepository.findOne({
      where: { name: dto.groupName },
    });

    const weeks = await this.weekService.findAllWithParams(
      {
        where: { group: grp },
      },
      true,
    );

    return {
      status: HttpStatus.OK,
      message: 'Успешно!',
      entities: weeks,
    };
  }
}
