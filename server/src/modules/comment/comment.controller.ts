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
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-guard.guard';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentI } from './interface/comment.interface';
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
  ): Promise<CommentI> {
    const userId = req.user.id;
    return await this.commentService.create(userId, postId, createCommentDto);
  }

  @Get()
  async getAllComments(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Comment[]> {
    return await this.commentService.getAllComments(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.getOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() name: string) {
    return this.commentService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
