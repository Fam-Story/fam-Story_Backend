import { Module } from '@nestjs/common';
import { UserService } from '../domain/user/user.service';
import { UserController } from '../domain/user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../infra/entities';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
