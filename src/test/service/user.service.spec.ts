import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../domain/user/user.service';
import { CreateUserDto } from '../../domain/user/dto/request/create-user.dto';
import { User } from '../../infra/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateUserDto } from '../../domain/user/dto/request/update-user.dto';

describe('UserService', () => {
  const mockRepository = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
  });

  let userService: UserService;
  let userRepository;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useFactory: mockRepository,
        },
      ],
    }).compile();
    userService = moduleRef.get<UserService>(UserService);
    userRepository = moduleRef.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('saveUser', () => {
    it('should save user and return id', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@test.com',
        username: 'test',
        password: 'test',
        nickname: 'test',
        age: 20,
        gender: 1,
      };
      jest.spyOn(userRepository, 'save').mockResolvedValue(1);
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(createUserDto);

      const testId = await userService.saveUser(createUserDto);
      const result = await userService.findUserById(testId);
      expect(result.username).toEqual('test');
    });
  });

  describe('updateUser', () => {
    it('should update user', async () => {
      const updateUserDto: UpdateUserDto = {
        userId: 1,
        email: 'test@test.com',
        username: 'test',
        password: 'test',
        nickname: 'test',
        age: 20,
        gender: 1,
      };
    });
  });
});
