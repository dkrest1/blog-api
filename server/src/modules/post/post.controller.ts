import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-guard.guard';
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
    @Request() req: any,
    @Body() createPostDto: CreatePostDto,
  ): Promise<Posts | any> {
    const post = new Posts();
    post.user = req.user.id;
    post.slug = createPostDto.slug;
    post.content = createPostDto.content;
    post.title = createPostDto.title;
    return await this.postService.create(post);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Post updated successfully.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiBody({ type: [UpdatePostDto] })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return await this.postService.update(id, updatePostDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Post updated successfully.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.postService.getPost(id);
  }

  @Get()
  getAll() {
    // return this.postService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.postService.remove(+id);
  }
}
