import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from '../group/group.entity';
import { WeekController } from './week.controller';
import { Week } from './week.entity';
import { WeekService } from './week.service';

@Module({
  imports: [TypeOrmModule.forFeature([Group, Week])],
  controllers: [WeekController],
  providers: [WeekService],
})
export class WeekModule {}
