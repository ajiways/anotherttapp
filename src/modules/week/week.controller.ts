import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateWeekDto } from './dtos/create-week.dto';
import { DeleteWeekDto } from './dtos/delete-week.dto';
import { UpdateWeekDto } from './dtos/update-week.dto';
import { WeekService } from './week.service';

@Controller('weeks')
export class WeekController {
  constructor(private readonly weekService: WeekService) {}

  @Post('create')
  @HttpCode(201)
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
