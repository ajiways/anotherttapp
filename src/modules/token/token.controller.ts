import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { RefreshToken } from '../../decorators/token.decorator';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get('refresh')
  async refresh(
    @RefreshToken() token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.tokenService.refresh(token);

    res.cookie('refreshToken', result.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return {
      status: HttpStatus.OK,
      message: 'Токен успешно обновлен',
      token: result.accessToken,
    };
  }
}
