import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class ParamsIdGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    if (isNaN(request.params.id) || request.params.id <= 0) {
      throw new HttpException(
        'В запросе неправильные параметры',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return true;
    }
  }
}
