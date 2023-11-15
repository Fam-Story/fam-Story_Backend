import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../infra/entities';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserException } from '../common/exception/user.exception';
import { ResponseCode } from '../common';
import { ResponseLoginDto } from './dto/response-login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  //유저 검증
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new UserException(ResponseCode.USER_NOT_FOUND);
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UserException(ResponseCode.USER_LOGIN_FAIL);
    }
    return user;
  }

  loginServiceUser(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    return ResponseLoginDto.of(
      this.jwtService.sign(payload),
      user.belongsToFamily,
    );
  }
}
