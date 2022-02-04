import { Module } from '@nestjs/common';
import { DayService } from './day.service';
import { DayController } from './day.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Week } from '../week/week.entity';
import { Day } from './day.entity';
import { Group } from '../group/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Week, Day, Group])],
  providers: [DayService],
  controllers: [DayController],
})
export class DayModule {}
