import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Week } from '../week/week.entity';
import { WeekService } from '../week/week.service';
import { GroupController } from './group.controller';
import { Group } from './group.entity';
import { GroupService } from './group.service';

@Module({
  imports: [TypeOrmModule.forFeature([Group, Week])],
  controllers: [GroupController],
  providers: [GroupService, WeekService],
  exports: [GroupService],
})
export class GroupModule {}
