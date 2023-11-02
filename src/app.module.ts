import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  FamilyModule,
  UserModule,
  FamilyMemberModule,
  FamilyScheduleModule,
  PhotoModule,
  PostModule,
  InteractionModule,
} from './module';
import { MysqlModule } from './infra/database/mysql.module';
import { AuthModule } from './auth';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    FamilyModule,
    MysqlModule,
    FamilyMemberModule,
    FamilyScheduleModule,
    PhotoModule,
    PostModule,
    InteractionModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
