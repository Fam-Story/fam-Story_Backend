import { Module } from '@nestjs/common';
import { PostController } from '../domain/post/post.controller';
import { PostService } from '../domain/post/post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../infra/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
