import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Day } from '../day/day.entity';
import { DayService } from '../day/day.service';
import { Group } from '../group/group.entity';
import { GroupService } from '../group/group.service';
import { WeekController } from './week.controller';
import { Week } from './week.entity';
import { WeekService } from './week.service';

@Module({
  imports: [TypeOrmModule.forFeature([Week, Group, Day])],
  controllers: [WeekController],
  providers: [WeekService, GroupService, DayService],
  exports: [WeekService],
})
export class WeekModule {}
