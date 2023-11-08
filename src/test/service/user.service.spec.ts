import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../domain/user';
import { CreateUserDto } from '../../domain/user';
import { User } from '../../infra/entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateUserDto } from '../../domain/user';
import { UserException } from '../../common/exception/user.exception';
import { ResponseCode } from '../../common';

describe('UserService', () => {
  const mockRepository = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
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
      const user: User = User.createUser(
        'test@test.com',
        'test',
        'test',
        'test',
        20,
        1,
      );
      const updateUserDto: UpdateUserDto = {
        userId: 1,
        email: 'test@test.com',
        username: 'test',
        password: 'test',
        nickname: 'test',
        age: 20,
        gender: 1,
      };
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(userRepository, 'save').mockResolvedValue(1);

      await userService.updateUser(updateUserDto);
      expect(userRepository.findOne).toHaveBeenCalled();
      expect(userRepository.save).toHaveBeenCalled();
    });

    it('should delete user', async () => {
      const user: User = User.createUser(
        'test@test.com',
        'test',
        'test',
        'test',
        20,
        1,
      );

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(userRepository, 'delete').mockResolvedValue(1);

      await userService.deleteUser(user.id);

      expect(userRepository.findOne).toHaveBeenCalled();
      expect(userRepository.delete).toHaveBeenCalled();
    });

    it('should throw error when user not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(userService.deleteUser(1)).rejects.toThrowError(
        new UserException(ResponseCode.USER_NOT_FOUND),
      );
      await expect(
        userService.updateUser(new UpdateUserDto()),
      ).rejects.toThrowError(new UserException(ResponseCode.USER_NOT_FOUND));
      await expect(userService.findUserById(1)).rejects.toThrowError(
        new UserException(ResponseCode.USER_NOT_FOUND),
      );
    });

    it('should throw error when user already exist', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@test.com',
        username: 'test',
        password: 'test',
        nickname: 'test',
        age: 20,
        gender: 1,
      };
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(createUserDto);
      await expect(
        userService.findUserByEmail('test@test.com'),
      ).rejects.toThrowError(
        new UserException(ResponseCode.USER_ALREADY_EXIST),
      );
    });
  });
});
