import { User } from '../../../../infra/entities';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('유저 응답 dto')
export class ResponseUserDto {
  @ApiProperty({ example: 1, description: '유저 아이디' })
  readonly userId: number;

  @ApiProperty({ example: 'example@example.com', description: '이메일' })
  readonly email: string;

  @ApiProperty({ example: 'example', description: '유저 이름' })
  readonly username: string;

  @ApiProperty({ example: 'nickname', description: '닉네임' })
  readonly nickname: string;

  @ApiProperty({ example: 20, description: '나이' })
  readonly age: number;

  @ApiProperty({ example: 0, description: '성별 (0: 남자, 1: 여자)' })
  readonly gender: number;

  private constructor(
    userId: number,
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
    userId: number,
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
