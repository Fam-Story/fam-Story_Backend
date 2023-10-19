import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../domain/user/user.service';
import { CreateUserDto } from '../../domain/user/dto/request/create-user.dto';
import { User } from '../../infra/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserService', () => {
  const mockRepository = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
  });

  let service: UserService;
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
    service = moduleRef.get<UserService>(UserService);
    userRepository = moduleRef.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

      const testId = await service.saveUser(createUserDto);
      const result = await service.findUserById(testId);
      expect(result.username).toEqual('test');
    });
  });
});
