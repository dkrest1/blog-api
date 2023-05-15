import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ParseUUIDPipe,
  HttpStatus,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiBody,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-guard.guard';
import { GetPosts } from '../common/enum/getPost.enum';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as Posts } from './entities/post.entity';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    description: 'Post created successfully.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiBody({ type: [CreatePostDto] })
  @Post('create')
  async create(
    @Body() createPostDto: CreatePostDto,
    @Request() req: any,
  ): Promise<Posts> {
    const post = new Posts();
    post.content = createPostDto.content;
    post.title = createPostDto.title;
    post.user = req.user.id;
    return await this.postService.createPost(post, req.user.id);
  }
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Post updated successfully.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: [UpdatePostDto] })
  @Patch(':id')
  async updatePost(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    postId: string,
    @Body() updatePostDto: UpdatePostDto,
    @Request() req: any,
  ): Promise<UpdatePostDto> {
    const userId: string = req.user.id;
    return await this.postService.updatePost(userId, postId, updatePostDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Get Personal Posts.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiParam({ name: 'me' })
  @Get('me')
  async getPostsByUserId(@Request() req: any): Promise<Posts[]> {
    const { id } = req.user;
    return await this.postService.getPostsByUserId(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Get all posts.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiQuery({ name: 'page', enum: GetPosts })
  @Get()
  getPosts(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Posts[]> {
    return this.postService.getPosts(page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Delete Post.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  deletePost(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
    @Request() req: any,
  ): Promise<string> {
    const userId: string = req.user.id;
    return this.postService.deletePost(id, userId);
  }
}
