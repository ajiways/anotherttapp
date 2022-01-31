import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';
import { IPayload } from './interfaces/payload.interface';

@Injectable()
export class TokenService {
  constructor(private configService: ConfigService) {}

  generateToken(payload: IPayload) {
    return sign({ payload }, this.configService.get('SECRET'));
  }

  verifyToken(token: unknown): IPayload | null {
    try {
      return verify(
        String(token),
        this.configService.get('SECRET'),
      ) as IPayload;
    } catch (error) {
      return null;
    }
  }
}
