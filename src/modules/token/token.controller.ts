import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';

@Controller('token')
export class TokenController {
  @Get('refresh')
  refresh() {
    // TODO: Метод будет обновлять токен по сдерствам refresh token
    throw new HttpException('Пока не реализовано', HttpStatus.BAD_REQUEST);
  }

  @Get('check')
  check() {
    // TODO: Метод будет проверять актуален ли токен на данный момент
    throw new HttpException('Пока не реализовано', HttpStatus.BAD_REQUEST);
  }
}
