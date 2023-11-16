import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from '../../domain/post';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FamilyMember, Post } from '../../infra/entities';

describe('PostService', () => {
  const mockRepository = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  });

  let postService: PostService;
  let postRepository;
  let familyMemberRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: getRepositoryToken(Post),
          useFactory: mockRepository,
        },
        {
          provide: getRepositoryToken(FamilyMember),
          useFactory: mockRepository,
        },
      ],
    }).compile();

    postService = module.get<PostService>(PostService);
    postRepository = module.get(getRepositoryToken(Post));
    familyMemberRepository = module.get(getRepositoryToken(FamilyMember));
  });

  it('should be defined', () => {
    expect(postService).toBeDefined();
  });
});
