import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { SlugProvider } from './slug.provider';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly slugProvider: SlugProvider,
  ) {}

  async createPost(
    createPostDto: CreatePostDto,
    userId: string,
  ): Promise<Post> {
    const uniqueSlug = await this.createUniqueSlug(createPostDto.title, userId);

    const existedPost = await this.findBySlug(uniqueSlug);

    if (existedPost) {
      throw new HttpException(
        'post existed, please create a new post',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    return await this.postRepository.save(
      this.postRepository.create({ ...createPostDto, slug: uniqueSlug }),
    );
  }

  async updatePost(
    userId: string,
    postId: string,
    updatePostDto: UpdatePostDto,
  ): Promise<UpdatePostDto> {
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['user'],
    });
    try {
      if (post.user.id !== userId) {
        throw new HttpException(
          'user with post does not exist',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }

      if (!post || !post.slug) {
        throw new HttpException('post does not exist', HttpStatus.NOT_FOUND);
      }
      const slug = await this.createUniqueSlug(
        updatePostDto.title,
        post.user.id,
      );
      const PostToUpdate = { ...post, ...updatePostDto, slug };
      const updatedPost = await this.postRepository.save(PostToUpdate);
      delete updatedPost.user;
      return updatedPost;
    } catch (err) {
      throw new HttpException(
        'user with post does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getPosts(page: number, limit: number): Promise<Post[]> {
    const posts = await this.postRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
    return posts;
  }

  async getPostById(id: string): Promise<Post> {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) {
      throw new HttpException('post does not exist', HttpStatus.NOT_FOUND);
    }
    return post;
  }

  async getPostsByUserId(id: string): Promise<Post[] | null> {
    const posts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoin('post.user', 'user')
      .where(`user.id = :id`, { id })
      .getMany();
    return posts;
  }

  private async findBySlug(slug: string): Promise<Post | null> {
    return await this.postRepository.findOneBy({ slug });
  }

  private async createUniqueSlug(title: string, id: string): Promise<string> {
    const slugifyTitle = await this.slugProvider.slugify(title);
    const uniqueSlug = slugifyTitle + '-' + id;
    return uniqueSlug;
  }

  //like a post
  async likePost(id: string): Promise<number> {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .where(`post.id  = :id`, { id })
      .getOne();

    console.log(post);

    const liked = post.likes.includes(post.user);
    //check if user available in the likes if not push in the userid
    if (!liked) {
      post.likes.push(post.user);
      await this.updatePostLikeCount(id, 1);
    }
    return this.getLikesCountForPost(id);
  }

  //unlike a post
  async unlikePost(id: string): Promise<number> {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .where(`post.id  = :id`, { id })
      .getOne();

    const liked = post.likes.includes(post.user);
    //check if user available in the likes if not push in the userid
    if (liked) {
      const index = post.likes.indexOf(post.user);
      if (index > -1) {
        post.likes.splice(index, 1);
      }
      await this.updatePostLikeCount(id, -1);
    }
    return this.getLikesCountForPost(id);
  }

  // update like count
  private async updatePostLikeCount(
    postId: string,
    increment: number,
  ): Promise<void> {
    const post = await this.getPostById(postId);
    post.likeCount += increment;
    await this.postRepository.save(post);
  }

  // get post likes count
  async getLikesCountForPost(postId: string): Promise<number> {
    const post = await this.getPostById(postId);
    return post.likeCount;
  }

  //delete post
  async deletePost(id: string, userId: string): Promise<string> {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .where(`post.id  = :id`, { id })
      .getOne();
    try {
      if (!post.user.id || post.user.id === null || post.user.id !== userId) {
        throw new HttpException(
          'user with post does not exit',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (post === null || !post) {
        throw new HttpException('post does not exist', HttpStatus.NOT_FOUND);
      }
      await this.postRepository.delete(id);
      return `This post has been deleted successfully`;
    } catch (err) {
      throw new HttpException(
        'user with post does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
