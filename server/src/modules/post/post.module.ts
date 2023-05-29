import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { SlugProvider } from './slug.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Post])],
  controllers: [PostController],
  providers: [PostService, SlugProvider],
  exports: [PostService],
})
export class PostModule {}
