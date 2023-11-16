import { Module } from '@nestjs/common';
import { PostController, PostService } from '../domain/post';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FamilyMember, Post } from '../infra/entities';

@Module({
  imports: [TypeOrmModule.forFeature([FamilyMember, Post])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
