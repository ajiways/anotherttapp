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
import { UserService } from './user.service';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  @Get('one/:id')
  @UseGuards(ParamsIdGuard)
  getUserById(@Param() params) {
    return this.userService.findOne(params.id);
  }

  @Delete('delete/:id')
  @UseGuards(ParamsIdGuard)
  deleleUserById(@Param() params) {
    return this.userService.deleteUser(params.id);
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Put('update')
  @UsePipes(ValidationPipe)
  updateUser(@Body() dto: UpdateUserDto) {
    return this.userService.updateUser(dto);
  }
}
