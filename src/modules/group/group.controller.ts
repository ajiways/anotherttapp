import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ParamsIdGuard } from '../../guards/params-id.guard';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { GetDays } from '../group/dtos/get-days.dto';
import { CreateGroupDto } from './dtos/create-group.dto';
import { GetGroupDto } from './dtos/get-group.dto';
import { UpdateGroupDto } from './dtos/update-group.dto';
import { GroupService } from './group.service';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  async getAllGroups() {
    return await this.groupService.findAll();
  }

  @Get('one/name')
  @UsePipes(ValidationPipe)
  async getByName(@Body() dto: GetGroupDto) {
    return await this.groupService.findOneWithParams({
      where: { name: dto.name },
    });
  }

  @Get('one/:id')
  @UseGuards(ParamsIdGuard)
  async getGroupById(@Param() params) {
    return await this.groupService.findOneWithParams({
      where: { id: params.id },
    });
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  async createGroup(@Body() dto: CreateGroupDto) {
    return await this.groupService.createGroup(dto);
  }

  @Put('update')
  @UsePipes(ValidationPipe)
  async updateGroup(@Body() dto: UpdateGroupDto) {
    return await this.groupService.updateGroup(dto);
  }

  @Delete('delete/:id')
  @UseGuards(ParamsIdGuard)
  async deleteGroup(@Param() params) {
    return await this.groupService.deleteGroup(params.id);
  }

  @Get('days')
  @UsePipes(ValidationPipe)
  async getDaysByGroupId(@Body() dto: GetDays) {
    return await this.groupService.getWeeksByGroupId(dto);
  }
}
