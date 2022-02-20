import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { CreateLessonDto } from './dtos/create-lesson.dto';
import { DeleteLessonDto } from './dtos/delete-lesson.dto';
import { UpdateLessonDto } from './dtos/update-lessons.dto';
import { LessonService } from './lesson.service';

@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post('create')
  @HttpCode(201)
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
