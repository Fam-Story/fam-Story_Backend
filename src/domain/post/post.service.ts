import { Injectable } from '@nestjs/common';
import { CreatePostDto, ResponsePostDto, UpdatePostDto } from './dto';
import { Family, FamilyMember, Post } from '../../infra/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseCode } from '../../common';
import { PostException } from '../../common/exception/post.exception';
import { FamilyMemberException } from '../../common/exception/family-member.exception';
import { FamilyException } from '../../common/exception/family.exception';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(FamilyMember)
    private familyMemberRepository: Repository<FamilyMember>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(Family) private familyRepository: Repository<Family>,
  ) {}
  async createPost(createPostDto: CreatePostDto) {
    const familyMember = await this.validateFamilyMember(
      createPostDto.srcMemberId,
    );
    const family = await this.validateFamily(createPostDto.familyId);

    const createDate = new Date(
      createPostDto.createdYear,
      createPostDto.createdMonth,
      createPostDto.createdDay,
    );
    createDate.setHours(createPostDto.createdHour);
    createDate.setMinutes(createPostDto.createdMinute);

    const post: Post = Post.createPost(
      createPostDto.title,
      createPostDto.context,
      createDate,
      familyMember,
      family,
    );
    const savedPost = await this.postRepository.save(post);
    return savedPost.id;
  }

  async updatePost(updatePostDto: UpdatePostDto) {
    const post = await this.validatePost(updatePostDto.id);
    await this.validateFamilyMember(updatePostDto.srcMemberId);

    await this.postRepository.update({ id: post.id }, { ...updatePostDto });
  }

  async findPostListByFamilyId(familyId: number): Promise<ResponsePostDto[]> {
    await this.validateFamily(familyId);
    const postList = await this.postRepository.find({
      where: { family: { id: familyId } },
      relations: ['family', 'srcMember'], //데이터베이스 칼럼 명이 아닌, 연관관계 필드명
    });
    postList.forEach((post) => {
      post.createdDate = new Date(post.createdDate);
    });
    return postList.map((post) => ResponsePostDto.from(post));
  }

  async deletePost(postId: number) {
    await this.validatePost(postId);
    await this.postRepository.delete(postId);
  }

  async validatePost(postId: number) {
    const post = await this.postRepository.findOne({
      where: { id: postId },
    });
    if (!post) {
      throw new PostException(ResponseCode.POST_NOT_FOUND);
    }
    return post;
  }

  async validateFamilyMember(familyMemberId: number) {
    const familyMember = await this.familyMemberRepository.findOne({
      where: { id: familyMemberId },
    });
    if (!familyMember) {
      throw new FamilyMemberException(ResponseCode.FAMILY_MEMBER_NOT_FOUND);
    }
    return familyMember;
  }

  async validateFamily(familyId: number) {
    const family = await this.familyRepository.findOne({
      where: { id: familyId },
    });
    if (!family) {
      throw new FamilyException(ResponseCode.FAMILY_NOT_FOUND);
    }
    return family;
  }
}
