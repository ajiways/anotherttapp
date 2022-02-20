import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config();

const configService = new ConfigService();

export const PORT = configService.get<number>('PORT');
export const SECRET = configService.get('SECRET');
export const REFRESH_SECRET = configService.get('REFRESH_SECRET');
