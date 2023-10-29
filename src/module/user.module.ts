import { Module } from '@nestjs/common';
import { UserService } from '../domain/user';
import { UserController } from '../domain/user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../infra/entities';
import { AuthModule } from '../auth';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
