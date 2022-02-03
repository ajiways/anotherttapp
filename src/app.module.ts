import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './config/typeorm';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TokenModule } from './modules/token/token.module';
import { DayModule } from './modules/day/day.module';
import { GroupModule } from './modules/group/group.module';
import { WeekModule } from './modules/week/week.module';
import { LessonModule } from './modules/lesson/lesson.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    TokenModule,
    DayModule,
    GroupModule,
    WeekModule,
    LessonModule,
  ],
})
export class AppModule {}
