import { Test, TestingModule } from '@nestjs/testing';
import { UserController, UserService } from '../../domain/user';
import { Auth } from 'typeorm';
import { AuthService } from '../../auth';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;
  let authService: AuthService;

  beforeEach(async () => {
    const mockUserService = {
      findAll: jest.fn().mockResolvedValue(['user1', 'user2']),
    };

    const mockAuthService = {
      login: jest.fn().mockResolvedValue(['user1', 'user2']),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();
    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
