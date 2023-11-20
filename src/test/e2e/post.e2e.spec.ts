import { Test, TestingModule } from '@nestjs/testing';
import { PostService, ResponsePostDto } from '../../domain/post';
import { INestApplication } from '@nestjs/common';
import { FamilyMember, Post } from '../../infra/entities';
import { Repository } from 'typeorm';
import { PostModule } from '../../module';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';

describe('PostController (e2e)', () => {
  let app: INestApplication;
  let mockPostService: Partial<PostService>;
  let mockPostRepository: Partial<Repository<Post>>;
  let mockFamilyMemberRepository: Partial<Repository<FamilyMember>>;

  const post: Post = Post.createPost(
    'testTitle',
    'testContext',
    new Date(),
    FamilyMember.createFamilyMember(1, null, null),
  );

  beforeEach(async () => {
    mockPostService = {
      createPost: jest.fn().mockResolvedValue(1),
      updatePost: jest.fn(),
      deletePost: jest.fn(),
      findPostListByMemberId: jest
        .fn()
        .mockResolvedValue([ResponsePostDto.from(post)]),
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

  it('should create post', async () => {
    const response = await request(app.getHttpServer()).post('/post').send({
      srcMemberId: 1,
      title: 'test',
      context: 'testContext',
      createdDate: new Date(),
    });
    expect(response.body.data).toBe(1);
    expect(response.body.message).toBe('게시글 생성 성공');
  });

  it('should update post', async () => {
    const response = await request(app.getHttpServer()).put('/post').send({
      postId: 1,
      srcMemberId: 1,
      title: 'test',
      context: 'testContext',
    });
    expect(response.body.message).toBe('게시글 정보 수정 성공');
  });

  it('should delete post', async () => {
    const response = await request(app.getHttpServer())
      .delete('/post')
      .query('postId=1');
    expect(response.body.message).toBe('게시글 삭제 성공');
  });

  it('should find post list by member id', async () => {
    const response = await request(app.getHttpServer())
      .get('/post')
      .query('familyMemberId=1');

    expect(response.body.message).toBe('게시글 조회 성공');
    expect(response.body.data[0].title).toBe('testTitle');
    expect(response.body.data[0].context).toBe('testContext');
  });
});

