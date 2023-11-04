import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
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
  async saveUser(createUserDto: CreateUserDto): Promise<number> {
    const savedUser: User = await this.userRepository.save(createUserDto);
    return savedUser.id;
  }

  //유저 정보 업데이트
  async updateUser(updateUserDto: UpdateUserDto): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: updateUserDto.userId },
    });

    if (!user) {
      throw new NotFoundException('해당 유저가 존재하지 않습니다.');
    }
    await this.userRepository.save(updateUserDto);
  }

  //이메일을 통한 중복 검사
  async findUserByEmail(userEmail: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: userEmail },
    });

    if (user) {
      throw new BadRequestException('이미 존재하는 유저입니다.');
    }
    return user;
  }

  //고유 ID로 유저 정보 조회
  async findUserById(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new UserException(ResponseCode.USER_NOT_FOUND);
    }
    return user;
  }
}
