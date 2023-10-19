import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/request/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../infra/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async saveUser(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async getUser(id: number) {
    return await this.userRepository.findOneBy({ id });
  }
}
