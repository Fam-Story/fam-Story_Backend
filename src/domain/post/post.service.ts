import { Injectable } from '@nestjs/common';
import { CreatePostDto, ResponsePostDto, UpdatePostDto } from './dto';
import { FamilyMember, Post } from '../../infra/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseCode } from '../../common';
import { PostException } from '../../common/exception/post.exception';
import { FamilyMemberException } from '../../common/exception/family-member.exception';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(FamilyMember)
    private familyMemberRepository: Repository<FamilyMember>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}
  async createPost(createPostDto: CreatePostDto) {
    const familyMember: FamilyMember =
      await this.familyMemberRepository.findOne({
        where: { id: createPostDto.srcMemberId },
      });
    const post: Post = Post.createPost(
      createPostDto.title,
      createPostDto.context,
      createPostDto.createdDate,
      familyMember,
    );
    const savedPost = await this.postRepository.save(post);
    return savedPost.id;
  }

  async updatePost(updatePostDto: UpdatePostDto) {
    const post = await this.validatePost(updatePostDto.postId);
    await this.validateFamilyMember(updatePostDto.srcMemberId);
    post.title = updatePostDto.title;
    post.context = updatePostDto.context;

    await this.postRepository.save(post);
  }

  async findPostListByMemberId(
    familyMemberId: number,
  ): Promise<ResponsePostDto[]> {
    await this.validateFamilyMember(familyMemberId);
    const postList = await this.postRepository.find({
      where: { srcMember: { id: familyMemberId } },
    });
    return postList.map((post) => ResponsePostDto.from(post));
  }

  async deletePost(postId: number) {
    await this.validatePost(postId);
    await this.postRepository.delete(postId);
  }

  async validatePost(postId: number) {
    const post = this.postRepository.findOne({
      where: { id: postId },
    });
    if (!post) {
      throw new PostException(ResponseCode.POST_NOT_FOUND);
    }
    return post;
  }

  async validateFamilyMember(familyMemberId: number) {
    const familyMember = this.familyMemberRepository.findOne({
      where: { id: familyMemberId },
    });
    if (!familyMember) {
      throw new FamilyMemberException(ResponseCode.FAMILY_MEMBER_NOT_FOUND);
    }
    return familyMember;
  }
}
