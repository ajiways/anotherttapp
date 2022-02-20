import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IParams } from '../../interfaces/params.interface';
import { CreateRoleDto } from './dtos/create-role.dto';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async findOneWithParams(params: IParams, check: boolean) {
    const candidate = await this.roleRepository.findOne({ ...params });

    if (check) {
      if (!candidate) {
        throw new HttpException(`Роль не найдена`, HttpStatus.NOT_FOUND);
      }
    }

    return candidate;
  }

  async create(dto: CreateRoleDto) {
    const candidate = await this.findOneWithParams(
      { where: { name: dto.name } },
      false,
    );

    if (candidate) {
      throw new HttpException(
        `Роль ${dto.name} уже существует`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return;
  }
}
