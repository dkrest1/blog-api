import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { SlugProvider } from './slug.provider';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly slugProvider: SlugProvider,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    return;
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
  ): Promise<UpdateResult> {
    return await this.postRepository.update(id, updatePostDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.postRepository.delete(id);
  }

  async findById(id: number): Promise<Post | null> {
    return await this.postRepository.findOneBy({ id });
  }

  async findBySlug(slug: string): Promise<Post | null> {
    return await this.postRepository.findOne({
      where: {
        slug,
      },
    });
  }

  private async findSlugs(slug: string): Promise<Post> {
    // return await this.postRepository
    //   .createQueryBuilder('post')
    //   .where('slug like : slug', { slug: `${slug}%` })
    //   .getMany();
    return;
  }

  async uniqueSlug(createPostDto: CreatePostDto): Promise<Post> {
    // createPostDto.slug = await this.slugProvider.slugify(createPostDto.title);
    // const existSlug = await this.findSlugs(createPostDto.slug);
    // // if slug never existed
    // if (!existSlug || existSlug.length == 0) {
    //   return createPostDto;
    // }

    // skip if blog exist
    // if (existSlug.length === 1 && createPostDto.id === existSlug[0].id) {
    //   return createPostDto;
    // }

    // // add to suffix
    // createPostDto.slug =
    //   createPostDto.slug + this.slugProvider.replacement() + existSlug.length;
    // return createPostDto;
    return;
  }
}
