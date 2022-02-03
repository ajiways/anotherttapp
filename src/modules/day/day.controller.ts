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

  @Get()
  getAllUsers() {
    return this.dayService.findAll();
  }

  @Get(':id')
  @UseGuards(ParamsIdGuard)
  getUserById(@Param() params) {
    return this.dayService.findOne(params.id);
  }

  @Delete(':id')
  @UseGuards(ParamsIdGuard)
  deleteById(@Param() params) {
    return this.dayService.deleteDay(params.id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createDay(@Body() dto: CreateDayDto) {
    return this.dayService.createDay(dto);
  }

  @Put()
  @UsePipes(ValidationPipe)
  updateDay(@Body() dto: UpdateDayDto) {
    return this.dayService.updateDay(dto);
  }
}
