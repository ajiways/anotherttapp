import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ParamsIdGuard } from '../../guards/params-id.guard';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { UpdateUserDto } from './dtos/update-user.dto';

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

  @Delete(':id')
  @UseGuards(ParamsIdGuard)
  deleleUserById(@Param() params) {
    return this.userService.deleteUser(params.id);
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Put('update/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(ParamsIdGuard)
  updateUser(@Body() dto: UpdateUserDto, @Param() params) {
    return this.userService.updateUser(params.id, dto);
  }
}
