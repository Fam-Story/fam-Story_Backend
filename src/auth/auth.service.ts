import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../infra/entities';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  //유저 검증
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new ForbiddenException('해당 유저가 존재하지 않습니다.');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new ForbiddenException('비밀번호가 일치하지 않습니다.');
    }
    return user;
  }
}
