import { User } from '../../../../infra/entities';

export class ResponseUserDto {
  readonly userId: number;
  readonly email: string;
  readonly username: string;
  readonly nickname: string;
  readonly age: number;
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
