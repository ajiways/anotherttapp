import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ParamsIdGuard } from '../../guards/params-id.guard';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(ParamsIdGuard)
  getUserById(@Param() params): Promise<User> {
    return this.userService.findOne(params.id);
  }
}
