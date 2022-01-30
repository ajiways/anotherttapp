import { getOrmConfig } from './typeorm';
import { join } from 'path';

export default [
  {
    name: 'migrations:generate',
    ...getOrmConfig(),
    entities: [join(__dirname, '..', '/modules', '/**', '/*.entity.{ts,js}')],
  },
  {
    name: 'migrations:create-run-revert',
    ...getOrmConfig(),
    migrations: [join(__dirname, '..', '/migrations', '/*.{ts,js}')],
  },
];
