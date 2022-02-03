import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { Group } from '../group/group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Day } from '../day/day.entity';
import { Week } from '../week/week.entity';
import { Lesson } from './lesson.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Day, Week, Lesson, Group])],
  providers: [LessonService],
  controllers: [LessonController],
})
export class LessonModule {}
