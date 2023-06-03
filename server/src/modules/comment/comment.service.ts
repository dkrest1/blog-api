import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PostService } from '../post/post.service';
import { UserService } from '../user/user.service';
import { IComment } from './interface/comment.interface';
import { UpdateCommentDto } from './dto/update-comment.dto';

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
  ): Promise<IComment> {
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

  async getOneComment(id: string): Promise<Comment> {
    const comment = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .leftJoinAndSelect('comment.post', 'post')
      .where(`comment.id  = :id`, { id })
      .getOne();
    if (!comment) {
      throw new HttpException('Comment does not exit', HttpStatus.BAD_REQUEST);
    }

    return comment;
  }

  async updateComment(
    commentId: string,
    userId: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: ['user'],
    });
    if (comment.user.id !== userId) {
      throw new HttpException(
        'user with comment does not exist',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    if (!comment) {
      throw new HttpException('comment does not exist', HttpStatus.NOT_FOUND);
    }
    const commentToUpdate = { ...comment, ...updateCommentDto };
    const updatedComment = await this.commentRepository.save(commentToUpdate);
    delete updatedComment.user;
    return updatedComment;
  }

  async remove(id: string, userId: string): Promise<string> {
    const comment = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .where(`comment.id  = :id`, { id })
      .getOne();
    if (
      !comment.user.id ||
      comment.user.id === null ||
      comment.user.id !== userId
    ) {
      throw new HttpException(
        'user with comment does not exit',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (comment === null || !comment) {
      throw new HttpException('comment does not exist', HttpStatus.NOT_FOUND);
    }
    await this.commentRepository.delete(id);
    return `This comment has been deleted successfully`;
  }
}
