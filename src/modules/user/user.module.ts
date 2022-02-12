import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Group } from '../group/group.entity';
import { GroupService } from '../group/group.service';
import { WeekService } from '../week/week.service';
import { Week } from '../week/week.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Group, Week])],
  providers: [UserService, GroupService, WeekService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}

// TODO: Роли
