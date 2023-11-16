import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from '../../domain/post';
import { INestApplication } from '@nestjs/common';
import { FamilyMember, Post } from '../../infra/entities';
import { Repository } from 'typeorm';
import { PostModule } from '../../module';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PostController (e2e)', () => {
  let app: INestApplication;
  let mockPostService: Partial<PostService>;
  let mockPostRepository: Partial<Repository<Post>>;
  let mockFamilyMemberRepository: Partial<Repository<FamilyMember>>;

  beforeEach(async () => {
    mockPostService = {
      createPost: jest.fn().mockResolvedValue(1),
      updatePost: jest.fn(),
      deletePost: jest.fn(),
    };
    mockPostRepository = {
      findOne: jest.fn(),
      find: jest.fn(),
    };
    mockFamilyMemberRepository = {
      findOne: jest.fn(),
      find: jest.fn(),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PostModule],
    })
      .overrideProvider(PostService)
      .useValue(mockPostService)
      .overrideProvider(getRepositoryToken(Post))
      .useValue(mockPostRepository)
      .overrideProvider(getRepositoryToken(FamilyMember))
      .useValue(mockFamilyMemberRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });
});
