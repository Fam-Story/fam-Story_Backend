import { Injectable } from '@nestjs/common';
import { CreateUserDto, ResponseUserDto, UpdateUserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../infra/entities';
import * as bcrypt from 'bcrypt';
import { UserException } from '../../common/exception/user.exception';
import { ResponseCode } from '../../common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  //비밀번호 암호화
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 11);
  }

  //유저 정보 저장
  async saveUser(createUserDto: CreateUserDto): Promise<void> {
    const user = User.createUser(
      createUserDto.email,
      createUserDto.password,
      createUserDto.username,
      createUserDto.nickname,
      createUserDto.age,
      createUserDto.gender,
    );
    const savedUser: User = await this.userRepository.save(user);
  }

  //유저 정보 업데이트
  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<void> {
    await this.validateUser(userId);
    await this.userRepository.save(updateUserDto);
  }

  //이메일을 통한 중복 검사
  async findUserByEmail(userEmail: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: userEmail },
    });

    if (user) {
      throw new UserException(ResponseCode.USER_ALREADY_EXIST);
    }
    return user;
  }

  //고유 ID로 유저 정보 조회
  async findUserById(userId: number): Promise<ResponseUserDto> {
    const user = await this.validateUser(userId);
    return ResponseUserDto.from(user);
  }

  //유저 삭제
  async deleteUser(userId: number): Promise<void> {
    await this.validateUser(userId);
    await this.userRepository.delete(userId);
  }

  private async validateUser(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new UserException(ResponseCode.USER_NOT_FOUND);
    }
    return user;
  }
}
