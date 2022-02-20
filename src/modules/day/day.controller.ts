import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { DayService } from './day.service';
import { CreateDayDto } from './dtos/create-day.dto';
import { UpdateDayDto } from './dtos/update-day.dto';

@Controller('day')
export class DayController {
  constructor(private readonly dayService: DayService) {}

  @Get('all')
  async getAllDays() {
    return await this.dayService.findAll();
  }

  @Post('create')
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async createDay(@Body() dto: CreateDayDto) {
    return await this.dayService.createDay(dto);
  }

  @Put('update')
  @UsePipes(ValidationPipe)
  async updateDay(@Body() dto: UpdateDayDto) {
    return await this.dayService.updateDay(dto);
  }
}
