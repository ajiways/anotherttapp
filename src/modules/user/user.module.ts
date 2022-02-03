import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Group } from '../group/group.entity';
import { GroupService } from '../group/group.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Group])],
  providers: [UserService, GroupService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}

// TODO: Роли
