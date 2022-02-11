import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from '../group/group.entity';
import { GroupService } from '../group/group.service';
import { TokenService } from '../token/token.service';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Group])],
  controllers: [AuthController],
  providers: [AuthService, UserService, GroupService, TokenService],
})
export class AuthModule {}
