import { User } from '../../../../infra/entities';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import {Long} from "typeorm";

@ApiTags('유저 응답 dto')
export class ResponseUserDto {
  @ApiProperty({ example: 1 })
  readonly userId: Long;

  @ApiProperty({ example: 'example@example.com' })
  readonly email: string;

  @ApiProperty({ example: 'example' })
  readonly username: string;

  @ApiProperty({ example: 'nickname' })
  readonly nickname: string;

  @ApiProperty({ example: 20 })
  readonly age: number;

  @ApiProperty({ example: 0 })
  readonly gender: number;

  private constructor(
    userId: Long,
    email: string,
    username: string,
    nickname: string,
    age: number,
    gender: number,
  ) {
    this.userId = userId;
    this.email = email;
    this.username = username;
    this.nickname = nickname;
    this.age = age;
    this.gender = gender;
  }

  static of(
    userId: Long,
    email: string,
    username: string,
    nickname: string,
    age: number,
    gender: number,
  ): ResponseUserDto {
    return new ResponseUserDto(userId, email, username, nickname, age, gender);
  }

  static from(user: User): ResponseUserDto {
    return new ResponseUserDto(
      user.id,
      user.email,
      user.username,
      user.nickname,
      user.age,
      user.gender,
    );
  }
}
