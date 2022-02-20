import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UsePipes,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { TokenService } from '../token/token.service';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
  ) {}

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
    @Req() req,
  ) {
    const response = await this.authService.login(dto, req.get('User-agent'));

    res.cookie('refreshToken', response.tokens.refreshToken);
    res.status(HttpStatus.OK);

    res.json({
      statusCode: HttpStatus.OK,
      message: response.message,
      token: response.tokens.accessToken,
    });
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    if (!req.cookies.token) {
      throw new HttpException(
        'Нельзя выйти из системы. Сначала нужно в нее войти',
        HttpStatus.BAD_REQUEST,
      );
    }

    const decodedData = this.tokenService.validateAccessToken(
      req.cookies.token,
    );

    if (!decodedData) {
      throw new HttpException(
        'Пользователь не авторизован',
        HttpStatus.BAD_REQUEST,
      );
    }

    res.status(HttpStatus.OK);
    res.clearCookie('token');

    res.json({
      resStatus: HttpStatus.OK,
      message: 'Успешный выход из системы',
    });
  }
}
