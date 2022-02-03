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
  ValidationPipe,
} from '@nestjs/common';
import { ParamsIdGuard } from '../../guards/params-id.guard';
import { CreateWeekDto } from './dtos/create-week.dto';
import { DeleteWeekDto } from './dtos/delete-week.dto';
import { UpdateWeekDto } from './dtos/update-week.dto';
import { WeekService } from './week.service';

@Controller('weeks')
export class WeekController {
  constructor(private readonly weekService: WeekService) {}

  @Get()
  async getAllWeeks() {
    return await this.weekService.findAll();
  }

  @Get(':id')
  @UseGuards(ParamsIdGuard)
  async getWeekById(@Param() params) {
    return await this.weekService.findOne(params.id);
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  async createWeek(@Body() dto: CreateWeekDto) {
    return await this.weekService.createWeek(dto);
  }

  @Put('update')
  @UsePipes(ValidationPipe)
  async updateWeek(@Body() dto: UpdateWeekDto) {
    return await this.weekService.updateWeek(dto);
  }

  @Delete('delete/:id')
  @UsePipes(ValidationPipe)
  async deleteWeek(@Body() dto: DeleteWeekDto) {
    return await this.weekService.deleteWeek(dto);
  }
}
