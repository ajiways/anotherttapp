import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { join } from 'path';

const configService = new ConfigService();

export function getOrmConfig(): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: configService.get('PG_HOST'),
    port: configService.get<number>('PG_PORT'),
    username: configService.get('PG_USER'),
    password: configService.get('PG_PASSWORD'),
    database: configService.get('PG_DATABASE'),
    namingStrategy: new SnakeNamingStrategy(),
    entities: [join(__dirname, '..', '/modules', '/**', '/*.entity.{ts,js}')],
    synchronize: false,
    migrations: [join(__dirname, '..', '/migrations', '/*.{ts,js}')],
    migrationsTableName: 'migrations',
    logging: 'all',
    cli: {
      migrationsDir: join(__dirname, '..', '/migrations'),
    },
  };
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => getOrmConfig(),
};
