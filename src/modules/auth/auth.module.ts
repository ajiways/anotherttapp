import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Day } from '../day/day.entity';
import { DayService } from '../day/day.service';
import { Group } from '../group/group.entity';
import { GroupService } from '../group/group.service';
import { TokenService } from '../token/token.service';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Week } from '../week/week.entity';
import { WeekService } from '../week/week.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Role } from '../user/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Group, Week, Day, Role])],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    TokenService,
    GroupService,
    WeekService,
    DayService,
  ],
})
export class AuthModule {}
