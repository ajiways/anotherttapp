import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sign, verify } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { REFRESH_SECRET, SECRET } from '../../misc/constants';
import { RoleService } from '../user/role.service';
import { UserService } from '../user/user.service';
import {
  IAccessPayload,
  IRefreshPayload,
} from './interfaces/payload.interface';
import { Token } from './token.entity';

@Injectable()
export class TokenService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    private readonly roleService: RoleService,
  ) {}

  generateRefreshToken(refreshPayload: IRefreshPayload) {
    const refreshToken = sign(refreshPayload, REFRESH_SECRET, {
      expiresIn: '30d',
    });

    return refreshToken;
  }

  generateAccessToken(payload: IAccessPayload) {
    const accessToken = sign(payload, SECRET, {
      expiresIn: '30s',
    });

    return accessToken;
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
      return null;
    }
  }

  async findToken(refreshToken: unknown) {
    const tokenData = await this.tokenRepository.findOne({
      refreshToken: String(refreshToken),
    });

    if (!tokenData) {
      throw new HttpException('Обновите токен', HttpStatus.FORBIDDEN);
    }

    return tokenData;
  }

  async saveToken(userId: number, refreshToken: string) {
    const tokenData = await this.tokenRepository.findOne({
      where: { user: userId },
    });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return await tokenData.save();
    }
    const user = await this.userService.findOneWithParams({
      where: { id: userId },
    });

    if (!user) {
      throw new HttpException(
        'Ошибка сервера',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return await this.tokenRepository
      .create({
        user,
        refreshToken,
      })
      .save();
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new Error('Пользователь не авторизован');
    }
    const decodedData = this.validateRefreshToken(refreshToken);
    const tokenFromDB = await this.findToken(refreshToken);

    if (!decodedData || !tokenFromDB) {
      throw new HttpException(
        'Пользователь не авторизован',
        HttpStatus.FORBIDDEN,
      );
    }

    const user = await this.userService.findOneWithParams({
      where: { id: decodedData.id },
    });

    if (!user) {
      throw new HttpException(
        'Ошибка сервера (Пользователь не существует. Токен.)',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const token = this.generateRefreshToken({
      agent: decodedData.agent,
      date: decodedData.date,
      id: decodedData.id,
    });

    const userRoles = await this.roleService.findAllWithParams(
      {
        where: { user_id: user.id },
      },
      { relations: ['users'], where: { id: user.id } },
    );

    const userRoleNames = userRoles.map((role) => role.name);

    const accessToken = this.generateAccessToken({
      id: user.id,
      roles: userRoleNames,
      password: user.password,
    });

    const newRefreshToken = await this.saveToken(user.id, token);

    return {
      refreshToken: newRefreshToken.refreshToken,
      accessToken: accessToken,
    };
  }
}
