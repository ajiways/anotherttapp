import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from '../group/group.entity';
import { GroupService } from '../group/group.service';
import { WeekController } from './week.controller';
import { Week } from './week.entity';
import { WeekService } from './week.service';

@Module({
  imports: [TypeOrmModule.forFeature([Week, Group])],
  controllers: [WeekController],
  providers: [WeekService, GroupService],
  exports: [WeekService],
})
export class WeekModule {}
