import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { SlugProvider } from './slug.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Posts])],
  controllers: [PostController],
  providers: [PostService, SlugProvider],
})
export class PostModule {}
