import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Day } from '../day/day.entity';
import { DayService } from '../day/day.service';
import { Token } from '../token/token.entity';
import { TokenService } from '../token/token.service';
import { Role } from '../user/role.entity';
import { RoleService } from '../user/role.service';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Week } from '../week/week.entity';
import { WeekService } from '../week/week.service';
import { GroupController } from './group.controller';
import { Group } from './group.entity';
import { GroupService } from './group.service';

@Module({
  imports: [TypeOrmModule.forFeature([Group, Week, Day, User, Token, Role])],
  controllers: [GroupController],
  providers: [
    GroupService,
    WeekService,
    DayService,
    TokenService,
    UserService,
    RoleService,
  ],
  exports: [GroupService],
})
export class GroupModule {}
