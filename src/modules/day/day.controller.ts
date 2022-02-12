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
import { DayService } from './day.service';
import { CreateDayDto } from './dtos/create-day.dto';
import { UpdateDayDto } from './dtos/update-day.dto';

@Controller('day')
export class DayController {
  constructor(private readonly dayService: DayService) {}

  @Get('all')
  async getAllUsers() {
    return await this.dayService.findAll();
  }

  @Get('one/:id')
  @UseGuards(ParamsIdGuard)
  async getUserById(@Param() params) {
    return await this.dayService.findOneWithParams({
      where: { id: params.id },
    });
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createDay(@Body() dto: CreateDayDto) {
    return await this.dayService.createDay(dto);
  }

  @Put()
  @UsePipes(ValidationPipe)
  async updateDay(@Body() dto: UpdateDayDto) {
    return await this.dayService.updateDay(dto);
  }
}
