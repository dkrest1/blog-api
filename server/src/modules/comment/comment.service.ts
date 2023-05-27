import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PostService } from '../post/post.service';
import { UserService } from '../user/user.service';
import { CommentI } from './interface/comment.interface';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}
  async create(
    userId: string,
    postId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<CommentI> {
    const user = await this.userService.findById(userId);
    const post = await this.postService.getPostById(postId);
    const comment = new Comment();
    comment.user = user;
    comment.post = post;
    comment.comment = createCommentDto.comment;
    await this.commentRepository.save(comment);
    return {
      username: `${user.firstname} ${user.lastname}`,
      user_image: user.profilePicture,
      email: user.email,
      post_title: post.title,
      comment: comment.comment,
      created_at: comment.created_at,
      updated_at: comment.updated_at,
    };
  }

  async getAllComments(page: number, limit: number): Promise<Comment[]> {
    const comments = await this.commentRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['user', 'post'],
    });
    return comments;
  }

  getOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
