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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
