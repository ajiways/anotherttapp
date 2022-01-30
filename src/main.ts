import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { getConnection } from 'typeorm';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  const connection = getConnection();
  await connection.runMigrations();
}
bootstrap();
