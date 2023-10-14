import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MysqlModule } from '../../infra/database/mysql.module';

@Module({
  imports: [MysqlModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
