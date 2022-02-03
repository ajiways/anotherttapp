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
import { CreateLessonDto } from './dtos/create-lesson.dto';
import { DeleteLessonDto } from './dtos/delete-lesson.dto';
import { UpdateLessonDto } from './dtos/update-lessons.dto';
import { LessonService } from './lesson.service';

@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Get()
  async getAllLessons() {
    return await this.lessonService.findAll();
  }

  @Get(':id')
  @UseGuards(ParamsIdGuard)
  async getLessonById(@Param() params) {
    return await this.lessonService.findOne(params.id);
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  async createLesson(@Body() dto: CreateLessonDto) {
    return await this.lessonService.createLesson(dto);
  }

  @Put('update')
  @UsePipes(ValidationPipe)
  async updateLesson(@Body() dto: UpdateLessonDto) {
    return await this.lessonService.updateLesson(dto);
  }

  @Delete('delete/:id')
  @UsePipes(ValidationPipe)
  async deleteLesson(@Body() dto: DeleteLessonDto) {
    return await this.lessonService.deleteLesson(dto);
  }
}
