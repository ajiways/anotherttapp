import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { REFRESH_SECRET, SECRET } from '../../misc/constants';
import { User } from '../user/user.entity';
import {
  IAccessPayload,
  IRefreshPayload,
} from './interfaces/payload.interface';
import { TokenEntity } from './token.entity';

@Injectable()
export class TokenService {
  generateTokens(payload: IAccessPayload, refreshPayload: IRefreshPayload) {
    const accessToken = sign(payload, SECRET, {
      expiresIn: '30s',
    });

    const refreshToken = sign(refreshPayload, REFRESH_SECRET, {
      expiresIn: '30d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token: unknown): IAccessPayload | null {
    try {
      const decodedData = verify(String(token), SECRET) as IAccessPayload;
      return decodedData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token: unknown): IRefreshPayload | null {
    try {
      const decodedData = verify(
        String(token),
        REFRESH_SECRET,
      ) as IRefreshPayload;
      return decodedData;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findToken(refreshToken: unknown) {
    const tokenData = await TokenEntity.findOne({
      refreshToken: String(refreshToken),
    });

    if (!tokenData) {
      throw new Error('Ошибка сервера (токен)');
    }

    return tokenData;
  }

  async saveToken(userId: number, refreshToken: string) {
    const tokenData = await TokenEntity.findOne({ where: { user: userId } });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return await tokenData.save();
    }
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('Ошибка сервера');
    }

    const token = new TokenEntity();
    token.user = user;
    token.refreshToken = refreshToken;

    return await token.save();
  }
}
