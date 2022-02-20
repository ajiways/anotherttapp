import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { TokenService } from '../modules/token/token.service';
import { Request } from 'express';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    if (!request.headers.authorization) {
      throw new HttpException(
        'Пользователь не авторизован',
        HttpStatus.FORBIDDEN,
      );
    }

    const token = request.headers.authorization.split(' ')[1];

    const decodedData = this.tokenService.validateAccessToken(token);

    if (!decodedData) {
      throw new HttpException(
        'Пользователь не авторизован',
        HttpStatus.FORBIDDEN,
      );
    }

    if (decodedData.roles.find((role) => role === 'Админ')) {
      return true;
    }

    throw new HttpException('Нет прав', HttpStatus.FORBIDDEN);
  }
}
