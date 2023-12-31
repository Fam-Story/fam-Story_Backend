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
    update: jest.fn(),
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
      const user = User.createUser(
        createUserDto.email,
        createUserDto.password,
        createUserDto.username,
        createUserDto.nickname,
        createUserDto.age,
        createUserDto.gender,
      );
      user.setId(1);

      jest.spyOn(userRepository, 'save').mockResolvedValue(user);
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(createUserDto);

      const result = await userService.findUserById(1);
      expect(result.username).toEqual('test');
    });
  });

  describe('updateUser', () => {
    it('should update user and should crypt password', async () => {
      const user: User = User.createUser(
        'test@test.com',
        'test',
        'test',
        'test',
        20,
        1,
      );
      user.setId(1);
      const updateUserDto: UpdateUserDto = {
        email: 'test@test.com',
        username: 'test',
        password: 'test',
        nickname: 'test',
        age: 20,
        gender: 1,
      };
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(userRepository, 'update').mockResolvedValue(1);
      jest.spyOn(userService, 'hashPassword').mockResolvedValue('@@#');

      await userService.updateUser(1, updateUserDto);
      expect(userRepository.findOne).toHaveBeenCalled();
      expect(userRepository.update).toHaveBeenCalled();
      expect(userService.hashPassword).toHaveBeenCalled();
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
        userService.updateUser(1, new UpdateUserDto()),
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
