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
import { GetDays } from '../group/dtos/get-days.dto';
import { WeekService } from '../week/week.service';
import { CreateGroupDto } from './dtos/create-group.dto';
import { UpdateGroupDto } from './dtos/update-group.dto';
import { Group } from './group.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @Inject(forwardRef(() => WeekService)) private weekService: WeekService,
  ) {}

  async findAll() {
    return await this.groupRepository.find();
  }

  async createGroup(dto: CreateGroupDto) {
    const candidate = await this.findOneWithParams({
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
    const candidate = await this.findOneWithParams({
      where: { name: dto.name },
    });

    return await this.groupRepository.merge(candidate, dto).save();
  }

  async deleteGroup(id: number) {
    await this.findOneWithParams({ where: { id } });

    return await this.groupRepository.delete(id);
  }

  async findOneWithParams(params: IParams) {
    const result = await this.groupRepository.findOne({ ...params });

    if (!result) {
      throw new HttpException(
        `Группа с указанными параметрами не найдена!`,
        HttpStatus.NOT_FOUND,
      );
    }

    return result;
  }

  async getWeeksByGroupId(dto: GetDays) {
    await this.findOneWithParams({ where: { id: dto.groupId } });

    return await this.weekService.findAllWithParams({
      where: { groupId: dto.groupId },
    });
  }
}
