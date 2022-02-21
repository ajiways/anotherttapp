import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { GroupService } from '../group/group.service';
import { Group } from '../group/group.entity';
import { WeekService } from '../week/week.service';
import { Week } from '../week/week.entity';
import { DayService } from '../day/day.service';
import { Day } from '../day/day.entity';
import { Token } from './token.entity';
import { Role } from '../user/role.entity';
import { RoleService } from '../user/role.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Group, Week, Day, Token, Role])],
  providers: [
    TokenService,
    UserService,
    GroupService,
    WeekService,
    DayService,
    RoleService,
  ],
  controllers: [TokenController],
  exports: [TokenService],
})
export class TokenModule {}
