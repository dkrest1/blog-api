import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  Param,
  Delete,
  Request,
  ParseUUIDPipe,
  HttpStatus,
  UseGuards,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-guard.guard';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { IComment } from './interface/comment.interface';
import { Comment } from './entities/comment.entity';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    description: 'Comment created successfully.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiParam({ name: 'id', description: 'post id to be commented' })
  @ApiBody({ type: [CreateCommentDto] })
  @Post('create/:id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    postId: string,
    @Body() createCommentDto: CreateCommentDto,
    @Request() req: any,
  ): Promise<IComment> {
    const userId = req.user.id;
    return await this.commentService.create(userId, postId, createCommentDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Get All Comments.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 400, description: 'User with comment does not exist' })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'the number of pages of comment',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'number of comments per pages',
  })
  @Get()
  async getAllComments(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Comment[]> {
    return await this.commentService.getAllComments(page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Get All Comments.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 400, description: 'User with comment does not exist' })
  @ApiParam({ name: 'id', description: 'comment id' })
  @Get(':id')
  getOneComment(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    commentId: string,
  ) {
    return this.commentService.getOneComment(commentId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Update comment.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 400, description: 'User with comment does not exist' })
  @ApiBody({ type: [UpdateCommentDto] })
  @ApiParam({ name: 'id', description: 'the id of the comment' })
  @Patch(':id')
  update(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    commentId: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @Request() req: any,
  ) {
    const userId = req.user.id;
    return this.commentService.updateComment(
      commentId,
      userId,
      updateCommentDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Delete Comment.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiParam({ name: 'id', description: 'comment id' })
  @Delete(':id')
  remove(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
    @Request() req: any,
  ): Promise<string> {
    const userId = req.user.id;
    return this.commentService.remove(id, userId);
  }
}
