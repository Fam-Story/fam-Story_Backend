import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './domain/user/user.module';
import { FamilyModule } from './domain/family/family.module';
import { MysqlModule } from './infra/database/mysql.module';

@Module({
  imports: [UserModule, FamilyModule, MysqlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
