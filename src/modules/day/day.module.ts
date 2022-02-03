import { Module } from '@nestjs/common';
import { DayService } from './day.service';
import { DayController } from './day.controller';

@Module({
  providers: [DayService],
  controllers: [DayController],
})
export class DayModule {}

// TODO: Реализовать группы и пары для корректной работы этого модуля
