import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../infra/entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async saveUser(createUserDto: CreateUserDto): Promise<number> {
    const savedUser: User = await this.userRepository.save(createUserDto);
    return savedUser.id;
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: updateUserDto.userId },
    });

    if (!user) {
      throw new NotFoundException('해당 유저가 존재하지 않습니다.');
    }
    await this.userRepository.save(updateUserDto);
  }

  async findUserById(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('해당 유저가 존재하지 않습니다.');
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
