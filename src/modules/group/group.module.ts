import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Day } from '../day/day.entity';
import { DayService } from '../day/day.service';
import { Week } from '../week/week.entity';
import { WeekService } from '../week/week.service';
import { GroupController } from './group.controller';
import { Group } from './group.entity';
import { GroupService } from './group.service';

@Module({
  imports: [TypeOrmModule.forFeature([Group, Week, Day])],
  controllers: [GroupController],
  providers: [GroupService, WeekService, DayService],
  exports: [GroupService],
})
export class GroupModule {}
