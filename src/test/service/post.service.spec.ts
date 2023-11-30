import { Test, TestingModule } from '@nestjs/testing';
import { CreatePostDto, PostService, UpdatePostDto } from '../../domain/post';
import { getRepositoryToken } from '@nestjs/typeorm';
import {Family, FamilyMember, Post} from '../../infra/entities';

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

  it('should create post', async () => {
    const family = Family.createFamily('test', 'test');
    const familyMember = FamilyMember.createFamilyMember(1, null, null, '');
    const post = Post.createPost(
      'test',
      'test',
      new Date(),
      familyMember,
      family,
    );
    post.id = 1;

    const createPostDto: CreatePostDto = {
      srcMemberId: 1,
      title: 'test',
      context: 'test',
      createdDate: new Date(),
    };

    jest
      .spyOn(familyMemberRepository, 'findOne')
      .mockResolvedValue(familyMember);
    jest.spyOn(postRepository, 'save').mockResolvedValue(post);

    const result = await postService.createPost(createPostDto);

    expect(result).toEqual(1);
  });

  it('should update post', async () => {
    const family = Family.createFamily('test', 'test');
    const familyMember = FamilyMember.createFamilyMember(1, null, null, '');
    const post = Post.createPost(
      'test',
      'test',
      new Date(),
      familyMember,
      family,
    );
    post.id = 1;

    const updatePostDto: UpdatePostDto = {
      postId: 1,
      title: 'test',
      context: 'test',
      createdDate: new Date(),
    };

    jest.spyOn(postRepository, 'findOne').mockResolvedValue(post);
    jest.spyOn(postRepository, 'save').mockResolvedValue(post);
    jest
      .spyOn(familyMemberRepository, 'findOne')
      .mockResolvedValue(familyMember);

    await postService.updatePost(updatePostDto);

    expect(postRepository.save).toHaveBeenCalled();
  });

  it('should delete post', async () => {
    const familyMember = FamilyMember.createFamilyMember(1, null, null, '');
    const post = Post.createPost('test', 'test', new Date(), familyMember, null);
    post.id = 1;

    jest.spyOn(postRepository, 'findOne').mockResolvedValue(post);
    jest.spyOn(postRepository, 'delete').mockResolvedValue(post);

    await postService.deletePost(1);

    expect(postRepository.delete).toHaveBeenCalled();
  });

  it('should get post list', async () => {
    const family = Family.createFamily('test', 'test');
    const familyMember = FamilyMember.createFamilyMember(1, null, null, '');
    familyMember.id = 1;
    const post = Post.createPost(
      'test',
      'test',
      new Date(),
      familyMember,
      family,
    );
    post.id = 1;

    const postList = [post];

    jest.spyOn(postRepository, 'find').mockResolvedValue(postList);
    jest
      .spyOn(familyMemberRepository, 'findOne')
      .mockResolvedValue(familyMember);

    const result = await postService.findPostListByFamilyId(1);

    expect(result.length).toEqual(1);
    expect(result[0].title).toEqual('test');
  });
});
