import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';

@Module({
  controllers: [BlogController]
})
export class BlogModule {}
