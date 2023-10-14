import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from '../../controller/user.controller';
import { MysqlModule } from '../../database/mysql.module';

@Module({
  imports: [MysqlModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
