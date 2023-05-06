import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { SlugProvider } from './slug.provider';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly slugProvider: SlugProvider,
    private readonly userService: UserService,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = await this.uniqueSlug(createPostDto);

    const existedPost = await this.findBySlug(post.slug);
    if (existedPost) {
      throw new HttpException(
        'post existed, please create a new post',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    return await this.postRepository.save(this.postRepository.create(post));
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
  ): Promise<UpdatePostDto> {
    const post = await this.findPostById(id);
    const user = await this.findPostByUserId(post.id);
    try {
      if (!post || !post.slug) {
        throw new HttpException('post does not exist', HttpStatus.NOT_FOUND);
      }
      if (!user.id) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }

      const slug = await this.slugProvider.slugify(updatePostDto.title);
      const PostToUpdate = { ...post, ...updatePostDto, slug };
      const updatedPost = this.postRepository.save(PostToUpdate);
      return updatedPost;
    } catch (err) {
      console.log(err);
      throw new HttpException(`${err.response}`, HttpStatus.BAD_GATEWAY);
    }
  }

  async getPost(id: string): Promise<Post> {
    const post = await this.findPostById(id);
    if (!post) {
      throw new HttpException('post does not exist', HttpStatus.NOT_FOUND);
    }
    return post;
  }

  async getPosts(): Promise<Post[]> {
    return;
  }

  async remove(id: number): Promise<string> {
    await this.postRepository.delete(id);
    return `This Post as ....`;
  }

  async findPostById(id: string): Promise<Post | null> {
    return await this.postRepository.findOneBy({ id });
  }

  async findPostByUserId(id: string): Promise<User | null> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    return post.user;
  }

  async findBySlug(slug: string): Promise<Post | null> {
    return await this.postRepository.findOneBy({ slug });
  }

  private async uniqueSlug(
    createPostDto: CreatePostDto,
  ): Promise<CreatePostDto> {
    const uniqueSlug = await this.slugProvider.slugify(createPostDto.title);

    try {
      const existedPost = await this.findSlugs(uniqueSlug);
      //if no title before, create post
      if (!existedPost || existedPost.length === 0) {
        createPostDto.slug = uniqueSlug;
      }

      //if title existed, return an error
      if (existedPost.length === 1 && createPostDto.id === existedPost[0].id) {
        throw new HttpException(
          'Post title existed, please try another post title',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
    } catch (err) {
      throw new HttpException(
        'sorry something went wrong, you cannot create post now',
        HttpStatus.BAD_GATEWAY,
      );
    }

    return { ...createPostDto, slug: uniqueSlug };
  }

  private async findSlugs(slug: string): Promise<Post[]> {
    return await this.postRepository
      .createQueryBuilder('post')
      .where('slug like :slug', { slug: `${slug}` })
      .getMany();
  }
}
